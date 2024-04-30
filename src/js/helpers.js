import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, payload = undefined) {
  try {
    const fetchPro = payload
      ? fetch(url, {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(`${data.message}`);
//     }
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async function (url, payload) {
//   try {
//     const res = await Promise.race([
//       fetch(url, {
//         method: 'POST',
//         headers: {
//           'content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       }),
//       timeout(TIMEOUT_SEC),
//     ]);
//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(`${data.message}`);
//     }
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
