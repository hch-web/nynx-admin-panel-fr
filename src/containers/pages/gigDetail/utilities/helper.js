export const findAdhocFeaturePrice = features => features?.find(field => field?.is_adhoc_feature && field.field_type === 'price');

export const findAdhocFeatureDescription = features => features?.find(field => field?.is_adhoc_feature && field.field_type === 'textarea');

export const findMonthlyFeaturePrice = features => features?.find(field => !field?.is_adhoc_feature && field.field_type === 'price');

export const findMonthlyFeatureDescription = features => features?.find(field => !field?.is_adhoc_feature && field.field_type === 'textarea');

export const findAdhocDeadlineFeatureField = features => features?.find(field => field?.is_adhoc_feature && field.field_type === 'deadline');

export const filterAdhocFields = features => features?.filter(
  field => field?.is_adhoc_feature && field.field_type !== 'price' && field.field_type !== 'textarea'
);

export const filterMonthlyFields = features => features?.filter(field => !field?.is_adhoc_feature && field.field_type !== 'price' && field.field_type !== 'textarea');

export const gigImagesSlider = {
  centerMode: true,
  centerPadding: '50px',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: true,
  swipeToSlide: true,

  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
  ],
};
export const gigImageSlider = {
  centerMode: true,
  centerPadding: '50px',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  swipeToSlide: true,

  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
  ],
};
