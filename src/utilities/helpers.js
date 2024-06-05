import imgFile from 'assets/file-image.svg';
import excelFile from 'assets/file-excel.svg';
import pdfFile from 'assets/file-pdf.svg';
import docFile from 'assets/file-doc.svg';
import pptFile from 'assets/file-ppt.png';
import generalFile from 'assets/file-simple.svg';
// Level Badges
import newExpertIcon from 'assets/new_expert_badge.svg';
import noviceIcon from 'assets/novice_bage.svg';
import achieverIcon from 'assets/achiever_badge.svg';
import nynxChoiceIcon from 'assets/nynx_choice.svg';
// IMAGES
import blankFile from 'assets/file_simple.svg';
import cssFile from 'assets/file-css.svg';
import sqlFile from 'assets/file-SQL.svg';
import aiFile from 'assets/file-AI.svg';

import moment from 'moment';
import { ACHIEVER, NEW_EXPERT, NOVICE, NYNX_PRO, PROJECT_BASED, DATE_FORMAT } from './constants';

export const getLocaleDate = date => moment(date, DATE_FORMAT).toDate();

export const sumArrayElement = (array, key) => array.reduce((accumulator, currentValue) => accumulator + +currentValue[key], 0);
export const setIconByFileType = type => {
  if (type.includes('pdf')) return pdfFile;
  if (type.includes('css')) return cssFile;
  if (
    type.includes('image') ||
    type.includes('png') ||
    type.includes('jpg') ||
    type.includes('jpeg') ||
    type.includes('svg')
  ) {
    return imgFile;
  }
  if (type.includes('ai')) return aiFile;
  if (type.includes('sql')) return sqlFile;
  if (
    type.includes('xls') ||
    type.includes('xlsx') ||
    type.includes('csv') ||
    type.includes('ms-excel') ||
    type.includes('spreadsheet')
  ) {
    return excelFile;
  }
  if (type.includes('doc')) return docFile;

  return blankFile;
};
export const formatFileSize = (sizeInBytes = 0) => {
  const decimal = 1;
  const marker = 1024;

  const toKB = (+sizeInBytes / marker).toFixed(decimal);
  const toMB = (+sizeInBytes / (marker * marker)).toFixed(decimal);
  const toGB = (+sizeInBytes / (marker * marker * marker)).toFixed(decimal);

  if (toKB < marker) return `${toKB} kb`;
  if (toMB < marker) return `${toMB} mb`;
  if (toGB < marker) return `${toGB} gb`;

  return +sizeInBytes;
};
export const convertURLToFile = async url => {
  const fileName = url.substring(url.lastIndexOf('/') + 1);
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], `${fileName}`, {
    type: blob.type,
  });
  file.imgSrc = url;

  return file;
};
export const convertMillisecondsToDuration = (timeInMilliSeconds = 0) => {
  const milliseconds = Math.abs(timeInMilliSeconds);
  let seconds = milliseconds / 1000;
  let minutes = Math.floor(seconds / 60);
  seconds = (seconds % 60).toFixed(0);
  let hours = Math.floor(minutes / 60);
  minutes %= 60;
  const days = Math.floor(hours / 24);
  hours %= 24;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};
export const formatTimeline = (days, type) => {
  const toMonths = Math.floor((days % 365) / 30);
  const toDays = Math.floor((days % 365) % 30);

  if (type === PROJECT_BASED) {
    if (days > 30) {
      return `${toMonths} Months ${toDays} Days`;
    }

    return `${days} Days`;
  }

  return `${days} Months`;
};
export const formatName = (firstName, lastName, userName) => (!!firstName && !!lastName ? `${firstName} ${lastName[0]}` : userName);
export const conditionalBadgeOfExpert = level => {
  switch (level) {
    case NEW_EXPERT:
      return newExpertIcon;
    case NOVICE:
      return noviceIcon;
    case ACHIEVER:
      return achieverIcon;
    case NYNX_PRO:
      return nynxChoiceIcon;
    default:
      return null;
  }
};
export const isPdfDocFile = (type = '') => {
  if (type?.includes('pdf') || type?.includes('text')) {
    return true;
  }

  return false;
};

export const isWordExcelFile = (type = '') => {
  if (type?.includes('doc') || type?.includes('docx') || type?.includes('xlsx')) {
    return true;
  }

  return false;
};

export const isImageFile = (type = '') => {
  if (type?.includes('image')) {
    return true;
  }

  return false;
};
export const getQueryParams = (url = '', keys = []) => {
  const query = url && new URLSearchParams(`?${url.split('?')[1]}`);
  const result = {};

  if (query) {
    keys?.forEach(key => {
      result[key] = +query.get(key) || undefined;
    });
  }

  return result;
};
export const isPptFile = (type = '') => {
  if (type?.includes('ppt') || type?.includes('pptx')) {
    return true;
  }

  return false;
};

export const isValidDocOrImage = (type = '') => {
  const isValidPdfDoc = isPdfDocFile(type);

  const isValidWordExcel = isWordExcelFile(type);

  const isValidPpt = isPptFile(type);

  const isValidImage = isImageFile(type);

  return isValidPdfDoc || isValidWordExcel || isValidPpt || isValidImage;
};

export const tets = '';

export const isMyMessage = (messageEmail, userEmail) => messageEmail === userEmail;

export const getIconByExtension = (name = '') => {
  if (name.endsWith('.xls') || name.endsWith('.xlsx')) return excelFile;
  if (name.endsWith('.pdf')) return pdfFile;
  if (name.endsWith('.csv')) return excelFile;
  if (name.endsWith('.doc') || name.endsWith('.docx')) return docFile;
  if (name.endsWith('.ppt') || name.endsWith('.pptx')) return pptFile;

  if (
    name.endsWith('.svg') ||
    name.endsWith('.png') ||
    name.endsWith('.jpg') ||
    name.endsWith('.jpeg') ||
    name.endsWith('.webp')
  ) {
    return imgFile;
  }

  return generalFile;
};

export const getFilenameFromUrl = (url = '') => {
  const urlParts = url?.split('/');

  return urlParts.pop();
};

export const getSearchParamsObj = searchParams => Object.fromEntries(searchParams);
export const getMonthListTillCurrentMonth = () => {
  const today = moment(); // get current date using moment.js
  const startOfYear = moment(today).startOf('year'); // get start of year
  const monthsList = []; // create empty array to hold month names

  const currentDate = moment(startOfYear); // set current date to start of year
  while (currentDate <= today) {
    // loop over each month up to current month
    monthsList.push({ label: currentDate.format('MMMM'), value: currentDate.month() + 1 }); // add month name to array
    currentDate.add(1, 'months'); // move to next month
  }
  return monthsList;
};
export const checkIsMessageSentByMe = (loggedId, ownerId) => loggedId === ownerId;

export const transformOptions = array => array?.map(item => ({
  ...item.response,
  last_message_time: item.response.last_message_time || item.response.room_created_at,
}));
export const getSorting = (order, orderBy) => {
  if (order === 'asc') {
    return (a, b) => {
      if (Number(a[orderBy]) < Number(b[orderBy])) {
        return -1;
      }
      if (Number(a[orderBy]) > Number(b[orderBy])) {
        return 1;
      }
      return 0;
    };
  }
  return (a, b) => {
    if (Number(a[orderBy]) > Number(b[orderBy])) {
      return -1;
    }
    if (Number(a[orderBy]) < Number(b[orderBy])) {
      return 1;
    }
    return 0;
  };
};
export const getDateSorting = (order, orderBy) => {
  if (order === 'asc') {
    return (a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return -1;
      }
      if (a[orderBy] > b[orderBy]) {
        return 1;
      }
      return 0;
    };
  }
  return (a, b) => {
    if (a[orderBy] > b[orderBy]) {
      return -1;
    }
    if (a[orderBy] < b[orderBy]) {
      return 1;
    }
    return 0;
  };
};
