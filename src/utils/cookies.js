const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`)
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const deleteCookie = (name) => {
  document.cookie = `${name} =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export { getCookie, deleteCookie };
