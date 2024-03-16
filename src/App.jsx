import React, { useState, useEffect } from 'react';
import { Container, Card, CardHeader, CardMedia, CardContent, Grid, Box, Typography, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import kanokLogo from './assets/kanok1.png';
import pachaLogo from './assets/pracha1.png';
import inLogo from './assets/indara1.png';
import bruLogo from './assets/bru1.png';
import logo from './assets/back.jpg';


const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
  },
  typography: { fontFamily: ["Krub", "sans-serif"].join(","), fontWeightRegular: 900 }
});


function App() {
  const [totalPeople, setTotalPeople] = useState(0);
  const [houses, setHouses] = useState([]);
  const [peopleNames, setPeopleNames] = useState([]);
  const [currentName, setCurrentName] = useState('');
  const [hasRandomized, setHasRandomized] = useState(false);
  const house = ["ประชาชื่น", "อินทร", "กนกอาชีวะ", "บูรณพล"];
  const picture = [pachaLogo, inLogo, kanokLogo, bruLogo];


  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  function randomizePeople(total) {
    const average = Math.floor(total / 4);
    let remainder = total % 4;
    const shuffledHouses = shuffle([0, 1, 2, 3]);
    const newHouses = [average, average, average, average];

    for (let i = 0; i < remainder; i++) {
      newHouses[shuffledHouses[i]] += 1;
    }
    setHouses(newHouses);
    setHasRandomized(true);
  };

  useEffect(() => {
    console.log(peopleNames)
  }, [peopleNames]);

  function assignToHouse(name) {
    if (name !== '') {
      for (; ;) {
        const randomHouseIndex = Math.floor(Math.random() * 4);
        if (houses[randomHouseIndex] > 0) {
          const updatedHouses = [...houses];
          updatedHouses[randomHouseIndex] -= 1;

          setPeopleNames([...peopleNames, { name: name, house: house[randomHouseIndex] }]);
          setHouses(updatedHouses);
          setCurrentName('');
          break;
        } else if (houses[randomHouseIndex] === 0) {
          continue;
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${logo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="md">
          <div>
            {!hasRandomized && (
              <div style={{ backgroundColor: 'white', padding: '10px', display: 'flex', alignItems: 'center', borderRadius: '10px' }}>
                <Typography variant="h5">จำนวนผู้สมัคร : </Typography>
                <TextField
                  id="inputEnter"
                  type="number"
                  style={{ flex: 1, marginRight: '10px', marginLeft: '10px' }}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= 0) {
                      setTotalPeople(value);
                    } else {
                      alert("กรุณากรอกจำนวนเต็มบวก");
                    }
                  }}
                  onKeyUp={(ev) => {
                    console.log(`Pressed keyCode ${ev.key}`);
                    if (ev.key === 'Enter') {
                      ev.preventDefault();
                      randomizePeople(totalPeople);
                    }
                  }}
                />
                {totalPeople > 0 && (
                  <Button variant="contained" onClick={() => randomizePeople(totalPeople)} style={{ height: '56px' }}>รับ</Button>
                )}
              </div>
            )}

            {hasRandomized && (
              <div style={{ backgroundColor: 'red', padding: '10px', borderRadius: '10px', marginBottom: '10px' }}>
                <Typography variant="h2" align="center" style={{ color: 'white' }}>จำนวนผู้สมัคร {totalPeople} คน</Typography>
              </div>
            )}
          </div>
          {houses.some(people => people !== 0) &&
            <div style={{ backgroundColor: 'white', padding: '10px', display: 'flex', alignItems: 'center', borderRadius: '10px', marginBottom: '1em' }}>
              <Typography variant="h5">กรอกชื่อ :</Typography>
              <TextField
                id='inputEnter'
                type="text"
                style={{ flex: 1, marginRight: '10px', marginLeft: '10px' }}
                onChange={(e) => setCurrentName(e.target.value)}
                value={currentName}
                onKeyUp={(ev) => {
                  console.log(`Pressed keyCode ${ev.key}`);
                  if (ev.key === 'Enter') {
                    ev.preventDefault();
                    assignToHouse(currentName);
                  }
                }}
              />
              <Button variant="contained" onClick={() => assignToHouse(currentName)} style={{ height: '56px' }}>สมัคร</Button>
            </div>
          }
          <Grid container spacing={2}>
            {houses.map((people, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardHeader title={`สถาบัน ${house[index]}`} />
                  <CardContent style={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        <img
                          width={'150px'}

                          src={picture[index]}
                          alt={house[index]}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6">สมาชิก :</Typography>
                        {peopleNames.map((person, idx) => {
                          if (person.house === house[index]) {
                            return <Typography key={idx}>{person.name}</Typography>;
                          }
                          return null;
                        })}
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Box p={2}>
                    <Typography>ที่ว่างเหลือ : {people} ที่</Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
