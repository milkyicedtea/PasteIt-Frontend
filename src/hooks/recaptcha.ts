declare const grecaptcha: any

export async function getRecaptchaToken(action: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof grecaptcha === "undefined") {
      reject(new Error("reCAPTCHA not loaded"))
      return
    }

    grecaptcha.enterprise.ready(async () => {
      try {
        const token = await grecaptcha.enterprise.execute(
          '6Lc2kt8qAAAAAPkH_NEseMoH2pRVOfwShCABIJcU',
          { action }
        )
        resolve(token)
      } catch (error) {
        reject(error)
      }
    })
  })
}