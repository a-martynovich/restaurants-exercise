function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export async function fetchJSON({method, url, body}) {
  console.log('fetchJSON', arguments);
  const csrftoken = getCookie('csrftoken');

  let f = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify(body)
  });

  let json = null;
  try {
    json = await f.json();
    console.log(json);
  } catch (e) {
    console.log(e);
  }

  if (!f.ok || json === null) {
    throw {status: f.status, text: f.statusText, body: json};
  }
  return json;
}