const getUrlByType = (type: number) => {
  let url = '';
  switch (type) {
    case 1: {
      url = 'bai-hat';
      break;
    }

    case 4: {
      url = 'playlist';
      break;
    }

    case 8: {
      url = 'audio';
      break;
    }

    default: {
      url = 'undefine';
      break;
    }
  }

  return url;
};
export default getUrlByType;
