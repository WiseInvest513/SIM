export interface PresetQuestion {
  question: string;
  answer: string;
  keywords: string[];
}

export const CHAT_PRESET_QUESTIONS: PresetQuestion[] = [
  {
    question: "作者是谁？",
    answer:
      "WisE 投资有术，全网 6 万粉丝，在推特/YouTube/小红书/哔哩哔哩同名账号均可查询，可放心购买。",
    keywords: ["作者", "谁", "是谁"],
  },
  {
    question: "公众号是什么？",
    answer:
      "关注国内公众号【庆辩】，获取最新联系方式和优惠信息。",
    keywords: ["公众号", "庆辩"],
  },
  {
    question: "giffgaff 是什么卡？",
    answer:
      "giffgaff 是英国 O2 旗下的虚拟运营商，永久免月租，可用于注册各类海外平台，是出海必备工具。",
    keywords: ["giffgaff", "是什么"],
  },
  {
    question: "有月租吗？",
    answer:
      "完全没有月租！giffgaff 采用 PAYG（按需充值）模式，不用时不扣任何费用，永久保号。",
    keywords: ["月租"],
  },
  {
    question: "多少钱？怎么买？",
    answer:
      "纯卡版 ¥89，含 £15 余额版 ¥199。点击页面'立即购买'按钮，支付宝/微信即可下单。",
    keywords: ["价格", "多少钱", "怎么买"],
  },
  {
    question: "哪里发货？什么时候发货？",
    answer:
      "从浙江/四川发货。下午三点前购买均可当日发出，否则第二天发出。一般 1-3 个工作日到手。",
    keywords: ["发货", "快递", "多久", "哪里", "什么时候"],
  },
  {
    question: "多久能收到？",
    answer:
      "快递发货，一般 1-3 个工作日到手。",
    keywords: ["多久", "几天", "到达"],
  },
  {
    question: "收到后怎么激活？",
    answer:
      "我们提供详细的激活教程，点击导航'使用教程'查看，或联系客服一对一指导。",
    keywords: ["激活", "怎么用"],
  },
  {
    question: "可以注册哪些平台？",
    answer:
      "PayPal、WhatsApp、Telegram、海外 Apple ID、ChatGPT、Wise 银行等几乎所有需要英国号码的平台。",
    keywords: ["注册", "平台"],
  },
  {
    question: "国内可以用来打电话吗？",
    answer:
      "国内漫游可以使用，但费用较高，主要用途是注册验证码接收，不建议日常通话。",
    keywords: ["打电话", "通话"],
  },
  {
    question: "为什么要在这里买？",
    answer:
      "国内平台已经无法发货了，我们是为数不多还在正常发货的渠道，可以直接邮寄到你家。",
    keywords: ["为什么", "为什么买", "为什么选择"],
  },
  {
    question: "如何联系作者？",
    answer:
      "付款之后联系作者，我会为你安排发货和后续服务。可以关注国内公众号【庆辩】获取最新联系方式。",
    keywords: ["联系", "微信", "作者", "联系方式"],
  },
  {
    question: "购买放心安全吗？",
    answer:
      "完全放心！我们是正规渠道销售，所有卡片都由官方授权直邮，国内有保障，一对一售后服务，不满意支持退货。可以关注国内公众号【庆辩】获取最新联系方式。",
    keywords: ["放心", "安全", "保障"],
  },
  {
    question: "国内无法购买怎么办？",
    answer:
      "如果在页面上无法购买，可以扫描页面底部二维码加我微信，我可以帮您代下单、邮寄到家，或者远程一对一协助购买。",
    keywords: ["无法购买", "不能买"],
  },
  {
    question: "需要国内账号吗？",
    answer:
      "不需要！giffgaff 卡可以独立使用，无需任何国内账户，直接注册激活即可。但如果想方便管理，可以用国内邮箱创建 giffgaff 账号。",
    keywords: ["国内账号", "账户"],
  },
  {
    question: "有国内客服支持吗？",
    answer:
      "有的！我提供 7×24 小时的中文客服支持，微信、邮件都可以联系我。任何问题都可以第一时间解答，不用担心语言沟通问题。",
    keywords: ["客服", "国内"],
  },
];

export const matchAnswerByKeywords = (input: string): string | null => {
  const lowerInput = input.toLowerCase();
  for (const preset of CHAT_PRESET_QUESTIONS) {
    for (const keyword of preset.keywords) {
      if (lowerInput.includes(keyword.toLowerCase())) {
        return preset.answer;
      }
    }
  }
  return null;
};

// 找到所有匹配的问题
export const findMatchingQuestions = (input: string): PresetQuestion[] => {
  const lowerInput = input.toLowerCase();
  const matched = new Set<string>();

  for (const preset of CHAT_PRESET_QUESTIONS) {
    for (const keyword of preset.keywords) {
      if (lowerInput.includes(keyword.toLowerCase())) {
        matched.add(preset.question);
      }
    }
  }

  return Array.from(matched).map(q =>
    CHAT_PRESET_QUESTIONS.find(p => p.question === q)!
  );
};

export const DEFAULT_FALLBACK_MESSAGE =
  "感谢您的提问！请扫描页面底部二维码加我微信，我会第一时间为您解答 😊";

export const WELCOME_MESSAGE = "👋 您好！我是 WiseSIM 客服。有什么问题我可以帮您解答吗？";
