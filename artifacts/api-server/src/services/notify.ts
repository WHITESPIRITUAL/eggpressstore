const OWNER_PHONE = process.env.OWNER_PHONE ?? "2349013698449";
const AFRICASTALKING_API_KEY = process.env.AFRICASTALKING_API_KEY ?? "";
const AFRICASTALKING_USERNAME = process.env.AFRICASTALKING_USERNAME ?? "";

const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY ?? "";

async function sendAfricasTalkingSMS(to: string, message: string): Promise<boolean> {
  if (!AFRICASTALKING_API_KEY || !AFRICASTALKING_USERNAME) return false;
  try {
    const formData = new URLSearchParams({
      username: AFRICASTALKING_USERNAME,
      to,
      message,
      from: "EGGPRESS",
    });
    const res = await fetch("https://api.africastalking.com/version1/messaging", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "apiKey": AFRICASTALKING_API_KEY,
      },
      body: formData.toString(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendCallMeBotWhatsApp(phone: string, message: string): Promise<boolean> {
  if (!CALLMEBOT_APIKEY) return false;
  try {
    const encodedMsg = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodedMsg}&apikey=${CALLMEBOT_APIKEY}`;
    const res = await fetch(url);
    return res.ok;
  } catch {
    return false;
  }
}

export async function notifyOwner(message: string): Promise<void> {
  const whatsappSent = await sendCallMeBotWhatsApp(OWNER_PHONE, message);
  if (!whatsappSent) {
    await sendAfricasTalkingSMS(`+${OWNER_PHONE}`, message);
  }
}

export async function notifyCustomer(phone: string, message: string): Promise<void> {
  const normalizedPhone = phone.startsWith("+") ? phone.slice(1) : phone.startsWith("0") ? `234${phone.slice(1)}` : phone;
  const smsSent = await sendAfricasTalkingSMS(`+${normalizedPhone}`, message);
  if (!smsSent) {
    await sendCallMeBotWhatsApp(normalizedPhone, message);
  }
}

export function buildOrderConfirmationMessage(opts: {
  customerName: string;
  orderId: string;
  eggSize: string;
  quantityType: string;
  totalAmount: number;
  deliveryType: string;
  referenceCode: string;
}): string {
  const qty = opts.quantityType.replace(/_/g, " ");
  return `🥚 *EGGPRESS* — Order Confirmed!\n\nHi ${opts.customerName}, your order has been received.\n\n📦 *Order ID:* ${opts.orderId}\n🥚 *Eggs:* ${opts.eggSize} — ${qty}\n💰 *Total:* ₦${opts.totalAmount.toLocaleString()}\n🚚 *Delivery:* ${opts.deliveryType}\n🔑 *Reference:* ${opts.referenceCode}\n\nWe'll confirm your payment shortly. Thank you! 🙏`;
}

export function buildOwnerNewOrderMessage(opts: {
  orderId: string;
  customerName: string;
  phone: string;
  eggSize: string;
  quantityType: string;
  totalAmount: number;
  deliveryType: string;
  address: string;
}): string {
  const qty = opts.quantityType.replace(/_/g, " ");
  return `🆕 *NEW ORDER — EGGPRESS*\n\n📋 *ID:* ${opts.orderId}\n👤 *Customer:* ${opts.customerName}\n📞 *Phone:* ${opts.phone}\n🥚 *Eggs:* ${opts.eggSize} — ${qty}\n💰 *Amount:* ₦${opts.totalAmount.toLocaleString()}\n🚚 *Type:* ${opts.deliveryType}\n📍 *Address:* ${opts.address}\n\nPlease verify payment and update status in admin panel.`;
}

export function buildStatusUpdateMessage(opts: {
  customerName: string;
  orderId: string;
  status: string;
}): string {
  const statusMessages: Record<string, string> = {
    payment_confirmed: `✅ Payment confirmed! We're preparing your order.`,
    preparing: `🔧 Great news! Your order is being prepared.`,
    ready: `📦 Your order is ready for ${opts.status === "ready" ? "pickup/dispatch" : "pickup"}!`,
    out_for_delivery: `🚚 Your eggs are on the way! Our rider is heading to you.`,
    delivered: `🎉 Your order has been delivered! Enjoy your fresh eggs. Thank you for choosing EGGPRESS!`,
  };
  const statusMsg = statusMessages[opts.status] ?? `Your order status has been updated to: ${opts.status.replace(/_/g, " ")}`;
  return `🥚 *EGGPRESS* — Order Update\n\nHi ${opts.customerName}!\n\n${statusMsg}\n\n📋 *Order:* ${opts.orderId}\n\nQuestions? Call/WhatsApp: 09013698449`;
}

export function buildOwnerStatusUpdateMessage(opts: {
  orderId: string;
  customerName: string;
  status: string;
}): string {
  return `✅ *EGGPRESS Admin*\n\nOrder ${opts.orderId} (${opts.customerName}) updated to: *${opts.status.replace(/_/g, " ").toUpperCase()}*`;
}

export function buildNewSubscriptionMessage(opts: {
  customerName: string;
  phone: string;
  eggSize: string;
  quantityType: string;
  frequency: string;
  address: string;
}): string {
  return `📅 *NEW SUBSCRIPTION — EGGPRESS*\n\n👤 ${opts.customerName}\n📞 ${opts.phone}\n🥚 ${opts.eggSize} eggs — ${opts.quantityType.replace(/_/g, " ")}\n⏰ ${opts.frequency}\n📍 ${opts.address}\n\nContact customer to confirm first delivery schedule.`;
}
