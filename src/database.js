export function postDataToDatabase(data, path, method, callback) {
  const onlineUrl = 'https://league-backend.onrender.com'
  const localUrl = 'http://127.0.0.1:5001'
  const body = data;
  console.log(`${onlineUrl}/${path}`)
  fetch(`${onlineUrl}/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  .then(
    response => {
      if (response.ok) {
        console.log('data sent!', path)
        callback(true);
      } else {
        console.error('data sending to backend error', path)
      }
    }
  )
  .catch(e => console.log('sending data requisition error', path, e))
}
