const form = document.getElementById('funForm');
const nameSelect = document.getElementById('nameSelect');
const customName = document.getElementById('customName');
const incomeInput = document.getElementById('incomeInput');
const result = document.getElementById('result');
const resetBtn = document.getElementById('resetBtn');
const tryAgainBox = document.getElementById('tryAgainBox');
const tryAgainBtn = document.getElementById('tryAgainBtn');

const funnyMessages = [
  "বিয়ের চিন্তা বাদ দাও, আগে মানিব্যাগ ভরাও! 💸",
  "৯ হাজারের নিচে? ভাই, বিয়ের আগে ইনকাম বাড়াও। 😅",
  "বিয়ের আগে ইনকামের উপর একটু কাজ করা দরকার।",
  "এখন বিয়ে করলে নুডলসেই হানিমুন করতে হবে! 🍜",
  "বিয়ের খরচ কি স্বপ্নে মেটাবা? আগে ইনকাম বাড়াও!",
  "৯ হাজারের নিচে বিয়ে মানে WiFi ছাড়া Netflix — অসম্পূর্ণ! 📶",
  "তোর ইনকামে আপাতত বিয়ে মানে ব্যাগে ছিদ্র নিয়ে বৃষ্টি ভিজা ☔",
  "বিয়েতে এখনই গেলে শ্বশুরবাড়ি হয়তো হাসবে! 😆",
  "ইনকাম না বাড়ালে বিয়ের পরে জামাই-আড্ডা নয়, শুধু দেনা-আড্ডা! 💰",
  "বিয়ের আগে ইনকাম জোগাড় কর, না হলে বাসর রাতেও Mobile Flexiload দিতে হবে! 📱",
  "৯০০০ পাউন্ডের নিচে বিয়ে করলে শ্বশুরবাড়ির বদলে যাবে মামার বাড়ি! 😂",
  "বিয়েতে এখন গেলে হয়তো কাবাব নয়, শুধু আলুর ভর্তাই খেতে হবে! 🥔",
  "ইনকাম বাড়া দরকার, নাহলে বউ শাড়ি চাইবে তুমি দিবে গামছা!",
  "৯০০০ পাউন্ডের নিচে বিয়ে মানে ঘরে ফ্যান ঘুরবে, কিন্তু ফ্রিজ খালি থাকবে! ❄️"
];

const highIncomeMessages = [
  "ওহো! ইনকাম ভালো, এখন চাইলে বিয়ে কইরা ফেলো! 💍",
  "তোমার ইনকাম দেখে শ্বশুরবাড়ি এখনি রাজি হবে! 😎",
  "অভিনন্দন! ইনকাম সিগনাল সবুজ দেখাচ্ছে, বিয়ে করো। 🚀",
  "তুমি এখন আর শুধু ক্রাশ না, কনেরও হিরো হতে পারো! ❤️"
];

// বাংলা সংখ্যা কনভার্ট
function toBengaliNumber(n){
  const map = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
  return String(n).split('').map(ch => map[ch] ?? ch).join('');
}

// Other অপশন সিলেক্ট করলে কাস্টম ইনপুট শো করবে
nameSelect.addEventListener('change', () => {
  if (nameSelect.value === 'Other') {
    customName.classList.remove('hidden');
  } else {
    customName.classList.add('hidden');
    customName.value = '';
  }
});

// ফর্ম সাবমিশন
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = (nameSelect.value === 'Other')
    ? customName.value.trim()
    : nameSelect.value.trim();

  let incomeRaw = incomeInput.value.trim();

  if(!name){
    showMessage('দয়া করে নাম সিলেক্ট করো বা লিখো।', 'warn');
    return;
  }
  if(incomeRaw === ''){
    showMessage('দয়া করে ইনকাম লিখো।', 'warn');
    return;
  }

  let income = Number(incomeRaw.replace(/,/g, ''));
  if(Number.isNaN(income)){
    showMessage('ইনকামটি ঠিকমতো সংখ্যা নয় — অনুগ্রহ করে সংখ্যা ব্যবহার করো।', 'warn');
    return;
  }

  // ✅ ফর্ম হাইড + আবার চেষ্টা বাটন শো
  form.classList.add("hidden");
  tryAgainBox.classList.remove("hidden");

  if(income < 9000){
    const randomMsg1 = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    showMessage(`নাম: ${name}\nইনকাম: ${toBengaliNumber(income)} পাউন্ড\n\n${randomMsg1}`, 'less');
  } else {
    const randomMsg2 = highIncomeMessages[Math.floor(Math.random() * highIncomeMessages.length)];
    showMessage(`নাম: ${name}\nইনকাম: ${toBengaliNumber(income)} পাউন্ড\n\n${randomMsg2} — শুভেচ্ছা! 🥳`, 'more');
  }
});

resetBtn.addEventListener('click', () => {
  nameSelect.value = '';
  customName.value = '';
  customName.classList.add('hidden');
  incomeInput.value = '';
  result.innerHTML = `<div><p class="text-gray-500">"সতর্কীকরণঃ এই ওয়েবসাইট ডাক্তার নয়, কিন্তু বিয়ের প্রেসক্রিপশন দেয়! 💸❤️"</p></div>`;
});

tryAgainBtn.addEventListener('click', () => {
  // আবার চেষ্টা করলে ফর্ম ফিরে আসবে
  form.classList.remove("hidden");
  tryAgainBox.classList.add("hidden");
  result.innerHTML = `<div><p class="text-gray-500">"নোটঃ এই ওয়েবসাইট শুধু মজা করার জন্য—বাস্তবে ইনকাম বাড়ানোই আসল কাজ! 😂"</p></div>`;
});

// মেসেজ দেখানোর ফাংশন
function showMessage(message, type){
  let bg='bg-white';
  let emoji='';
  if(type === 'warn') { bg='bg-amber-50 border-amber-200'; emoji='⚠️'; }
  if(type === 'less') { bg='bg-blue-50 border-blue-200'; emoji=''; }
  if(type === 'more') { bg='bg-green-50 border-green-200'; emoji=''; }

  result.innerHTML = `
    <div class="p-4 rounded-lg border ${bg} w-full">
      <p class="font-semibold text-lg mb-2">${emoji} ফলাফল</p>
      <p style="white-space: pre-line;" class="text-gray-700">${message}</p>
    </div>
  `;

  // bounce animation
  result.animate([
    { transform: 'translateY(-6px)', opacity: 0.9 },
    { transform: 'translateY(0)', opacity: 1 }
  ], { duration: 300, easing: 'ease-out' });
}
