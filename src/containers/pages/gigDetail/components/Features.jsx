import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import propTypes from 'prop-types';

// styles
import myStyles from 'styles/mui/containers/gig-details.module.scss';
import {
  featureBodyStyles,
  featureContainerWrapper,
  featureTableStyles,
  tableFeatureTitleStyles,
  tableFeatureValueStyles,
  tableSingleFeatureStyles,
} from 'styles/mui/containers/gig-details-styles';

// common
import Tooltip from 'containers/common/components/Tooltip';

// components
import FieldValue from './FieldValue';

function Features({ features, isAdhoc, featurePrice, isMonthlyTier, featureDescription, isAdhocThreeTier }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // Constants
  const backgroundColor = isAdhoc ? myStyles.lightYellow : myStyles.lightDarkerPink;
  const featureBackgroundColor = isAdhoc ? myStyles.offWhite : myStyles.lighterOffWhite;
  const isThreeTier = isAdhoc ? isAdhocThreeTier : isMonthlyTier;
  return (
    <Box sx={featureContainerWrapper}>
      <Box sx={featureTableStyles}>
        <table className="w-100">
          <tbody className="p-5">
            <tr className={`${backgroundColor}`} style={featureBodyStyles}>
              <th style={tableFeatureTitleStyles} className="top-left-corner-border">
                <Box className="d-flex align-items-center noWrap">
                  <Box>
                    <Typography variant="h6" color={darkPurple} className="weight-500">
                      Package
                    </Typography>
                  </Box>
                  <Box className="ms-md-2 ms-sm-0">
                    <Typography
                      variant="caption"
                      color={darkPurple}
                      className={`weight-500 ms-md-2 ms-sm-0 ${myStyles.packageType}`}
                    >
                      {isAdhoc ? 'Fixed' : 'Monthly'}
                    </Typography>
                  </Box>
                </Box>
              </th>
              <th
                className={`${!isThreeTier && 'top-right-corner-border'}`}
                style={isThreeTier ? tableFeatureValueStyles : tableSingleFeatureStyles}
              >
                <Typography variant="h6" color={darkPurple} className="mt-1 weight-500">
                  <Tooltip title={featureDescription.basic} placement="top-start">
                    <span> ${featurePrice?.basic} </span>
                  </Tooltip>
                </Typography>
                <Typography variant="caption" color={darkPurple} className=" weight-500">
                  Basic
                </Typography>
              </th>
              {isThreeTier && (
                <th style={tableFeatureValueStyles}>
                  <Typography variant="h6" color={darkPurple} className="mt-1 weight-500">
                    <Tooltip title={featureDescription.standard} placement="top-start">
                      <span> ${featurePrice?.standard} </span>
                    </Tooltip>
                  </Typography>
                  <Typography variant="caption" color={darkPurple} className=" weight-500">
                    Standard
                  </Typography>
                </th>
              )}
              {isThreeTier && (
                <th
                  className={`${isThreeTier && ' top-right-corner-border'}`}
                  style={tableFeatureValueStyles}
                >
                  <Tooltip title={featureDescription.premium} placement="top-start">
                    <span>
                      <Typography variant="h6" color={darkPurple} className="mt-1 weight-500">
                        <span> ${featurePrice?.premium} </span>
                      </Typography>
                      <Typography variant="caption" color={darkPurple} className=" weight-500 ">
                        Premium
                      </Typography>
                    </span>
                  </Tooltip>
                </th>
              )}
            </tr>
            {features?.map((item, idx) => (
              <tr
                key={item?.id}
                className={` ${(idx + 1) % 2 === 0 ? backgroundColor : featureBackgroundColor}`}
              >
                <th style={tableFeatureTitleStyles}>
                  <Typography variant="h6" color={darkPurple} className="mt-1">
                    {item?.field_name || ''}
                  </Typography>
                </th>
                <td
                  className={`${isThreeTier ? 'tableHoverStyles' : 'singleValueTableStyles'}`}
                  style={tableFeatureValueStyles}
                >
                  <FieldValue fieldType={item.field_type} values={item} valueType="basic" />
                </td>
                {isThreeTier && (
                  <td
                    className={`${isThreeTier ? 'tableHoverStyles' : 'singleValueTableStyles'}`}
                    style={tableFeatureValueStyles}
                  >
                    <FieldValue fieldType={item.field_type} values={item} valueType="standard" />
                  </td>
                )}
                {isThreeTier && (
                  <td
                    className={`${isThreeTier ? 'tableHoverStyles' : 'singleValueTableStyles'}`}
                    style={tableFeatureValueStyles}
                  >
                    <FieldValue fieldType={item.field_type} values={item} valueType="premium" />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <Box
        className={`w-100 d-flex justify-content-end pt-3 pb-4 px-3  ${backgroundColor}`}
        sx={{ borderRadius: '0px 0px 15px 15px', zIndex: 10 }}
      />
    </Box>
  );
}

Features.propTypes = {
  features: propTypes.array.isRequired,
  isAdhoc: propTypes.bool,
  featurePrice: propTypes.object,
  featureDescription: propTypes.object,
  isMonthlyTier: propTypes.bool.isRequired,
  isAdhocThreeTier: propTypes.bool.isRequired,
};

Features.defaultProps = {
  isAdhoc: false,
  featurePrice: {},
  featureDescription: {},
};

export default Features;
