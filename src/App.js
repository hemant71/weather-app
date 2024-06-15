import { useEffect, useState } from "react";
import { SpinnerDiamond } from "spinners-react";
import {
  Box,
  IconButton,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import SearchIcon from "@mui/icons-material/Search";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import SickIcon from "@mui/icons-material/Sick";
import AirIcon from "@mui/icons-material/Air";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import DeviceThermostatSharpIcon from "@mui/icons-material/DeviceThermostatSharp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("gorakhpur");
  const [pre, setPre] = useState(null);
  const [pre2, setPre2] = useState(null);
  const [temp, setTemp] = useState();
  const [days7, setDays7] = useState(null);
  const [pre3, setPre3] = useState(null);
  const [forcastdata, setForcastdata] = useState(null);
  const [mainicon, setMainicon] = useState(null);
  useEffect(() => {
    get();
  }, [city]);
  async function get() {
    try {
      setData(null);
      const raw = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=48373ae55a2c901ab39312d88e099f0f`
      );
      const raw2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=8&units=metric&appid=48373ae55a2c901ab39312d88e099f0f`
      );
      const raw3 = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days&key=P36YPY773BLHRR3D79CJ49XV6&contentType=json`
      );
      const dataobj = await raw.json();
      const dataobj3 = await raw3.json();
      const dataobj2 = await raw2.json();
      setData(dataobj);
      setForcastdata(dataobj2.list);
      setDays7(dataobj3.days.slice(1, 8));
      setMainicon(
        "https://openweathermap.org/img/wn/" +
          dataobj.weather[0].icon +
          "@4x.png"
      );
      setPre(dataobj);
      setPre2(dataobj2.list);
      setPre3(dataobj3.days.slice(1, 8));
    } catch (err) {
      toast.error("Not a valid city name!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
      });
      setData(pre);
      setForcastdata(pre2);
      setDays7(pre3);
    }
  }
  const Container = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5C5470",
  };
  const main = {
    width: "55%",
    height: "85%",
    borderRadius: "20px",
    backgroundColor: "#352F44",
    display: "flex",
    justifyContent: "space-evenly",
    // border:'2px solid black',
    alignItems: "center",
    position: "relative",
  };
  const forcast = {
    width: "30%",
    height: "95%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const currentweather = {
    width: "66%",
    height: "95%",
    // border:'2px solid black'
    // backgroundColor:'#B9B4C7',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // alignContent:'space-between',
  };
  const searchbox = {
    width: "100%",
    px: "20px",
    height: "10%",
    backgroundColor: "#5C5470",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "13px",
  };
  const iconbox = {
    width: "100%",
    height: "29%",
    // backgroundColor:'#B9B4C7',
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const itembox = {
    width: "100%",
    height: "33%",
    backgroundColor: "#5C5470",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderRadius: "10px",
    alignContent: "space-between",
  };
  const iconboxtext = {
    height: "100%",
    width: "40%",
    // backgroundColor:'olive'
  };
  const iconboxicon = {
    height: "100%",
    width: "40%",
    // backgroundColor:'purple',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const hourlyforcast = {
    height: "23%",
    width: "100%",
    // backgroundColor:'#5C5470',
    display: "flex",

    // justifyContent:'center',
    direction: "row",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  };
  const items = {
    height: "48%",
    width: "32.5%",
    px: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:'orange'
  };
  const theme = createTheme({
    palette: {
      text: {
        main: "#ffffff",
      },
    },
  });
  function getloc() {
    var lat = "";
    var long = "";
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        try {
          setData(null);
          const raw = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=48373ae55a2c901ab39312d88e099f0f`
          );
          const raw2 = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&cnt=8&units=metric&appid=48373ae55a2c901ab39312d88e099f0f`
          );
          const raw3 = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C${long}?unitGroup=metric&include=days&key=P36YPY773BLHRR3D79CJ49XV6&contentType=json`
          );
          const dataobj2 = await raw2.json();
          const dataobj = await raw.json();
          const dataobj3 = await raw3.json();
          console.log(dataobj3);
          console.log(dataobj2);
          console.log(dataobj);
          setData(dataobj);
          setForcastdata(dataobj2.list);
          setDays7(dataobj3.days.slice(1, 8));
          setMainicon(
            "https://openweathermap.org/img/wn/" +
              dataobj.weather[0].icon +
              "@4x.png"
          );
          setPre(dataobj);
          setPre2(dataobj2.list);
          setPre3(dataobj3.days.slice(1, 8));
        } catch (err) {
          toast.error("🦄 Wow so easy!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setData(pre);
          setForcastdata(pre2);
          setDays7(pre3);
        }
      });
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Box sx={Container}>
        <Box sx={main}>
          {!data ? (
            <h2>
              <SpinnerDiamond
                size={50}
                thickness={99}
                speed={100}
                color="rgba(255, 255, 255, 1)"
                secondaryColor="rgba(0, 0, 0, 0.51)"
              />
            </h2>
          ) : (
            <>
              <Box sx={currentweather}>
                <Box sx={searchbox}>
                  <TextField
                    color="text"
                    InputProps={{ style: { color: "white" } }}
                    onChange={(e) => setTemp(e.target.value)}
                    InputLabelProps={{ style: { color: "white" } }}
                    variant="standard"
                    fullWidth
                    size="small"
                    label="Search for cities"
                  />
                  {/* <Button variant='contained' size='small'><SearchIcon/></Button> */}
                  <IconButton
                    onClick={() => setCity(temp)}
                    TouchRippleProps={{ style: { color: "white" } }}
                  >
                    <SearchIcon color="text" size="large" />
                  </IconButton>
                  <IconButton
                    onClick={getloc}
                    TouchRippleProps={{ style: { color: "white" } }}
                  >
                    <MyLocationIcon color="text" />
                  </IconButton>
                </Box>
                <Box sx={iconbox}>
                  <Box sx={iconboxtext}>
                    {/* <Box sx={iconboxcity}></Box>
                                     <Box sx={iconboxtemp}></Box> */}
                    <Typography variant="h4">{data.name}</Typography>
                    <Typography variant="body2">{data.sys.country}</Typography>
                    <Typography variant="body2">
                      {data.weather[0].description}
                    </Typography>
                    <Typography variant="h2">{data.main.temp}°C</Typography>
                  </Box>
                  <Box sx={iconboxicon}>
                    <img
                      src={mainicon}
                      alt="Trulli"
                      width="200px"
                      height="200px"
                    />
                  </Box>
                </Box>
                <Box sx={hourlyforcast}>
                  <Stack spacing={1} direction="row">
                    {forcastdata.map((item, index) => {
                      return <Scrollbox key={index} data={item} />;
                    })}
                  </Stack>
                </Box>
                <Box sx={itembox}>
                  <Box sx={items}>
                    <SickIcon />
                    <Typography variant="body1">
                      {data.main.feels_like}°C
                    </Typography>
                    <Typography variant="body2"> Real feel</Typography>
                  </Box>
                  <Box sx={items}>
                    <DeviceThermostatSharpIcon />
                    <Typography variant="body1">
                      {data.main.temp_max}°C
                    </Typography>
                    <Typography variant="body2"> Max temp</Typography>
                  </Box>
                  <Box sx={items}>
                    <TireRepairIcon />
                    <Typography variant="body1">
                      {data.main.pressure} hPa
                    </Typography>
                    <Typography variant="body2"> Pressure</Typography>
                  </Box>
                  <Box sx={items}>
                    <WaterDropIcon />
                    <Typography variant="body1">
                      {data.main.humidity}%
                    </Typography>
                    <Typography variant="body2"> Humidity</Typography>
                  </Box>
                  <Box sx={items}>
                    <DeviceThermostatSharpIcon size="medium" />
                    <Typography variant="body1">
                      {data.main.temp_min}°C
                    </Typography>
                    <Typography variant="body2"> Min temp</Typography>
                  </Box>
                  <Box sx={items}>
                    <AirIcon />
                    <Typography variant="body1">
                      {data.wind.speed} m/s
                    </Typography>
                    <Typography variant="body2"> Wind </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={forcast}>
                {days7.map((item, index) => {
                  return <Days key={index} data={item} />;
                })}
              </Box>
            </>
          )}
        </Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ThemeProvider>
  );
}
function Scrollbox({ data }) {
  const icon =
    "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png";

  const scrollbox = {
    height: "100%",
    minWidth: "77.7px",
    backgroundColor: "#5C5470",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  var dt = new Date(data.dt_txt).getTime();
  dt = dt + 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
  var tm = "AM";
  var hour = new Date(dt).getHours();
  if (hour >= 12) {
    tm = "PM";
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  var min = new Date(dt).getMinutes();

  return (
    <Box sx={scrollbox}>
      <Typography variant="body2">
        {hour}:{min} {tm}
      </Typography>
      <img src={icon} alt="Weather Icon" width="60" height="60" />
      <Typography variant="body2">{data.main.temp}°C</Typography>
    </Box>
  );
}
function Days({ data }) {
  const items = {
    width: "100%",
    p: "10px",
    height: "13%",
    borderRadius: "10px",
    backgroundColor: "#5C5470",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  };
  const text = {
    display: "flex",
    justifyContent: "space-between",
  };
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <Box sx={items}>
      <Typography variant="body2">{data.conditions}</Typography>
      <Box sx={text}>
        <Typography variant="body1">
          {new Date(data.datetime).getDate()}{" "}
          {month[new Date(data.datetime).getMonth()]}
        </Typography>
        <Typography variant="body1">
          {data.tempmin}°C/{data.tempmax}°C
        </Typography>
      </Box>
    </Box>
  );
}
