const fs = require('fs')
fs.writeFileSync('./.env',
'REACT_APP_MAPBOX_ACCESS_TOKEN=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}\n')
