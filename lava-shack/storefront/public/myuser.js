// MyUserPay.setKey(process.env.NEXT_PUBLIC_MYUSER_PUBLIC_KEY)
// console.log({ publicKey })

function setPublicKey() {
  var publicKeyContainer = document.querySelector("#publicKey")
  var publicKey = publicKeyContainer ? publicKeyContainer.value : ""
  MyUserPay.setKey(publicKey)
}
var elementId = ""

function loadMyUser() {
  console.log("load my user elem")
  let t = setTimeout(() => {
    if (MyUserPay != undefined) {
      setPublicKey()
      var amountContainer = document.querySelector("#amount")
      var amount = amountContainer ? amountContainer.value : ""

      console.log("create elem")
      elementId = MyUserPay.createElement("#custom", { amount: amount })

      MyUserPay.onPaymentSucceed(function (formId, MyUserToken) {
        // console.log({ formId, MyUserToken })
      })

      clearTimeout(t)
    }
  }, 500)
}

function save(event) {
  console.log("saving card")
  event.preventDefault()
  paymentBtn.disabled = true
  paymentBtn.innerHTML = "Loading..."
  console.log("payment continue, generate myuser token")
  MyUserPay.createElementToken(elementId, async function (data) {
    if (data.status) {
      // console.log({ data })
      // window.sessionStorage.setItem("c_myuser_token", data.token)

      var res = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      })
      var json = await res.json()
      // console.log({ json })
      window.sessionStorage.setItem("c_myuser_token", json.src_id)
      paymentBtn.innerHTML = "Saved"
    } else {
      console.error(data)
      paymentBtn.disabled = false
      paymentBtn.innerHTML = "ReSave"
    }
  })
}

const paymentBtn = document.querySelector("#paymentBtn")
if (paymentBtn) {
  paymentBtn.addEventListener("click", save)
}

const checkoutBtn = document.querySelector("#myuser-checkout")
if (checkoutBtn) {
  // checoutBtn.addEventListener("click", function (event) {
  //   console.log("checkout clicked")
  //   myuserPay_openPaymentModal(1)
  //   event.preventDefault()
  // })

  checkoutBtn.addEventListener("click", function (event) {})
}

const onIntersection = (entries, observer) => {
  for (const { isIntersecting, target } of entries) {
    if (isIntersecting) {
      loadMyUser()
      // observer.unobserve(target)
    }
  }
}

var custom = document.querySelector("#custom")

const observer = new IntersectionObserver(onIntersection, {
  root: document.body,
  threshold: [0],
})

if (custom) {
  observer.observe(custom)
}
