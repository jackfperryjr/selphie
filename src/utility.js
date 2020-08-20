export function decodeJWT (token) {
    try {
      if (!token) {
          throw new Error('parseJwt# Token is required.')
      }

      const base64Payload = token.split('.')[1]
      let payload = new Uint8Array()

      try {
          payload = Buffer.from(base64Payload, 'base64')
      } catch (err) {
          throw new Error(`parseJwt# Malformed token: ${err}`)
      }

      return {
          token: JSON.parse(payload),
      }
    } catch (err) {
        console.log(`Bonus logging: ${err}`)

        return {
            error: 'Unable to decode token.',
        }
    }
  }

export function compareJWTDate () {
    let token = localStorage.token
    const base64Payload = token.split('.')[1]
    let payload = new Uint8Array()
    payload = Buffer.from(base64Payload, 'base64')
    token = JSON.parse(payload)
    let today = Date.now() / 1000
    console.log('Token Date: ' + token.exp)
    console.log('Today Date: ' + today)
    if (token.exp > today) {
        console.log("Token is not expired.")
    } else {
        console.log("Token is expired.")
    }
}