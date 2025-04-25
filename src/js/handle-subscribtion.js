let choosedSubscribtion = null;
const subscribtionBtns = document.querySelectorAll(".subscribtion__item");
const continueBtn = document.querySelector("#continue-subscribtion");

try {
  if (subscribtionBtns.length) {
    subscribtionBtns.forEach((btn) => {
      btn.addEventListener("click", handleSubscribtionClick, true);
    });
  }

  continueBtn.addEventListener("click", handleContinueClick);
} catch (error) {
  console.log("Error by choosing subscribtion", error);
}

document.addEventListener("click", handleOuterClick);

function handleSubscribtionClick(event) {
  subscribtionBtns.forEach((btn) => {
    btn.classList.remove("subscribtion__item_active");
  });

  const btn = event.currentTarget;
  const value = btn.getAttribute("data-value");

  btn.classList.toggle("subscribtion__item_active");
  if (!value) {
    throw new Error("subscribtion is not valid");
  }

  choosedSubscribtion = value;
  return;
}

function handleContinueClick(event) {
  if (!choosedSubscribtion) return;
  window.open(choosedSubscribtion, "_blank");
  return;
}

function handleOuterClick(event) {
  const clickedInside = event.target.closest(".subscribtion__item");
  
  if (!clickedInside) {
    choosedSubscribtion = null;

    subscribtionBtns.forEach((btn) => {
      btn.classList.remove("subscribtion__item_active");
    });
  }
}
