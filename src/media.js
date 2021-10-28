const size = {
  mobile: '320px',
  tablet: '780px',
  desktop: '1080px',
}

const device = {
  mobile: `screen and (max-width : ${size.mobile})`,
  tablet: `screen and (max-width : ${size.tablet})`,
  desktop: `screen and (max-width : ${size.desktop})`,
}

const media = {
  device,
}

export default media
