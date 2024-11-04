import { ReactComponent as PowerIcon } from "../config/svgfiles/zap.svg";
import { ReactComponent as EnergyIcon } from "../config/svgfiles/zap.svg";
import { ReactComponent as TemperatureIcon } from "../config/svgfiles/loader.svg";
import { ReactComponent as HumidIcon } from "../config/svgfiles/droplet.svg";
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import { ReactComponent as AQIcon } from "../config/svgfiles/wind.svg";
import { ReactComponent as LightIcon } from "../config/svgfiles/sun.svg";

export const iconsCon = [
    {
        gadget_name : 'energy',
        gadget_name_jp : 'エネルギー',
        render: (props) => <EnergyIcon {...props} />,
    },
    {
        gadget_name : 'power',
        gadget_name_jp : '力',
        render: (props) => <PowerIcon {...props} />,
    },
    {
        gadget_name : 'temperature',
        gadget_name_jp : '温度',
        render: (props) => <TemperatureIcon {...props} />,
    },
    {
        gadget_name : 'humidity',
        gadget_name_jp : '湿度',
        render: (props) => <HumidIcon {...props} />,
    },
    {
        gadget_name : 'noise',
        render: (props) => <VolumeUpOutlinedIcon {...props} />,
    },
    {
        gadget_name : 'co2',
        render: (props) => <AQIcon {...props} />,
    },
    {
        gadget_name : 'lux',
        render: (props) => <LightIcon {...props} />,
    },
    {
        gadget_name : 'current',
        render: (props) => <PowerIcon {...props} />,
    },
]