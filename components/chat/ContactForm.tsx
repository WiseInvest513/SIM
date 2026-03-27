"use client";

import { useState, useEffect } from "react";
import { Mail, X, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface ContactFormProps {
  onClose: () => void;
}

const RETRY_DELAY = 3 * 60 * 1000; // 3分钟
const MAX_RETRIES = 1; // 最多重试1次

export function ContactForm({ onClose }: ContactFormProps) {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [retryTimer, setRetryTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setFormData({
          name: session.user.user_metadata?.name || session.user.email?.split("@")[0] || "",
          email: session.user.email || "",
          message: "",
        });
        setNeedsLogin(false);
      } else {
        setNeedsLogin(true);
      }
    });
  }, []);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, [retryTimer]);

  const scheduleRetry = (attempt: number) => {
    if (attempt >= MAX_RETRIES) {
      alert("邮件发送失败，请稍后再试或联系管理员");
      return;
    }

    const timer = setTimeout(() => {
      handleSendEmail(attempt + 1);
    }, RETRY_DELAY);

    setRetryTimer(timer);
  };

  const handleSendEmail = async (attempt: number = 0) => {
    try {
      const response = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setRetryCount(0);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);
      } else {
        if (attempt < MAX_RETRIES) {
          alert(`发送失败，将在 3 分钟后自动重试...`);
          scheduleRetry(attempt);
        } else {
          alert("邮件发送失败，请稍后再试");
        }
      }
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        alert(`发送失败，将在 3 分钟后自动重试...`);
        scheduleRetry(attempt);
      } else {
        alert("邮件发送失败，请稍后再试");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRetryCount(0);

    // 如果有之前的重试定时器，清除它
    if (retryTimer) {
      clearTimeout(retryTimer);
      setRetryTimer(null);
    }

    handleSendEmail(0);
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-2xl p-8 max-w-sm w-full text-center border border-blue-600">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-white font-semibold mb-2">邮件已发送！</h3>
          <p className="text-gray-400 text-sm">我已收到你的问题，会尽快回复</p>
        </div>
      </div>
    );
  }

  if (needsLogin) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-2xl border-2 border-blue-600 w-full max-w-md shadow-2xl">
          {/* 头部 */}
          <div className="bg-blue-600 px-6 py-4 flex items-center justify-between rounded-t-xl">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-white" />
              <h3 className="text-white font-semibold">发送邮件给我</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 登录提示 */}
          <div className="p-8 text-center">
            <div className="text-5xl mb-4">🔐</div>
            <h3 className="text-white font-semibold mb-2 text-lg">需要登录</h3>
            <p className="text-gray-400 mb-6">
              请登录后再发送邮件，这样我能更好地帮助你
            </p>
            <button
              onClick={() => {
                onClose();
                router.push("/auth/login");
              }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors mb-3"
            >
              去登录
            </button>
            <button
              onClick={onClose}
              className="w-full border border-gray-600 text-gray-400 hover:text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border-2 border-blue-600 w-full max-w-md shadow-2xl">
        {/* 头部 */}
        <div className="bg-blue-600 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-white" />
            <h3 className="text-white font-semibold">发送邮件给我</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {user ? (
            <>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                <p className="text-xs text-gray-400 mb-2">发送人信息</p>
                <p className="text-white font-medium">{formData.name}</p>
                <p className="text-gray-400 text-sm">{formData.email}</p>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">问题描述</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="请描述你遇到的问题或建议..."
                  rows={5}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-300 text-sm mb-2">你的名字</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="请输入名字"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">你的邮箱</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="你的邮箱地址"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">问题描述</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="请描述你的问题..."
                  rows={4}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                发送中...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                发送邮件
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            我会尽快回复你的邮件
          </p>
        </form>
      </div>
    </div>
  );
}
