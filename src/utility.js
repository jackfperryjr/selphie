export function decodeJWT (accessToken) {
    try {
      if (!accessToken) {
          throw new Error('parseJwt# Token is required.')
      }

      const base64Payload = accessToken.split('.')[1]
      let payload = new Uint8Array()

      try {
          payload = Buffer.from(base64Payload, 'base64')
      } catch (err) {
          throw new Error(`parseJwt# Malformed accessToken: ${err}`)
      }

      return {
          accessToken: JSON.parse(payload),
      }
    } catch (err) {
        console.log(`Bonus logging: ${err}`)

        return {
            error: 'Unable to decode accessToken.',
        }
    }
  }

export function compareJWTDate () {
    let accessToken = localStorage.accessToken
    const base64Payload = accessToken.split('.')[1]
    let payload = new Uint8Array()
    payload = Buffer.from(base64Payload, 'base64')
    accessToken = JSON.parse(payload)
    let today = Date.now() / 1000
    console.log('Token Date: ' + accessToken.exp)
    console.log('Today Date: ' + today)
    if (accessToken.exp > today) {
        console.log("Token is not expired.")
    } else {
        console.log("Token is expired.")
    }
}

export function refresh (accessToken) {
    let refreshToken = JSON.parse(localStorage.refreshToken)
    fetch('https://chocobo.moogleapi.com/v1/account/refresh', {
        method: 'post',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          },
        body: JSON.stringify(refreshToken)
      }).then(response => response.json())
        .then(function(response) {
            localStorage.setItem('accessToken', JSON.stringify(response.accessToken))
            localStorage.setItem('refreshToken', JSON.stringify(response.refreshToken))
        })
}