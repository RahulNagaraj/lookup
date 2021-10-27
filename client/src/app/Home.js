import React from "react";
import {alpha, styled} from '@mui/material/styles';
import {
    Autocomplete,
    Box, Card, CardActionArea, CardActions, CardContent, CardMedia,
    Container,
    FormControl,
    Grid,
    InputBase,
    InputLabel,
    MenuItem,
    Select, TextField,
    Typography
} from "@mui/material";
import {blue, blueGrey, lightBlue} from "@mui/material/colors";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';

const locations = [
    {
        value: 'Chicago',
    },
    {
        value: 'New York',
    },
    {
        value: 'San Fransisco',
    },
    {
        value: 'Seattle',
    },
];

const services = [
    {
        name: 'Electricians',
        key: 'electricians',
        imagePath: 'electician logo.png'
    },
    {
        name: 'Plumbers',
        key: 'plumbers',
        imagePath: 'plumber logo.jpg'
    },
    {
        name: 'Carpenters',
        key: 'carpenters',
        imagePath: 'carpenter logo.png'
    },
    {
        name: 'Painters',
        key: 'painters',
        imagePath: 'painter logo.jpg'
    },
    {
        name: 'Appliance Repair',
        key: 'applicanceRepair',
        imagePath: 'appliance repair logo.jpg'
    },
    {
        name: 'Pest Control',
        key: 'pestControl',
        imagePath: 'pestcontrollogo.png'
    },
    {
        name: 'AC Repair',
        key: 'acRepair',
        imagePath: 'ac repair logo.jpg'
    }
];

const offers = [
    {
        title: 'Kitchen Cleaning',
        offer: 'Upto $50 off',
        imagePath: 'Kitchen cleaning.jpg'
    },
    {
        title: 'Pest Control',
        offer: 'Flat $50 off',
        imagePath: 'pest control.jpg'
    },
    {
        title: 'Appliance Repair',
        offer: 'Starts at $99',
        imagePath: 'appliance repair.jpg'
    }
];

const trending = [
    {
        name: 'Air Conditioner',
        type: 'product',
        recent: 'new',
        imagePath: 'ac repair.jpg'
    },
    {
        name: 'Plumbing',
        type: 'services',
        imagePath: 'plumber service.jpg',
    },
    {
        name: 'Electrical',
        type: 'services',
        imagePath: 'elecrical service.jpg'
    }
];

const recommendedEvents = [
    {
        title: 'Marathon 21k',
        type: 'sports',
        location: 'Chicago',
        imagePath: 'marathon event.jpg',
    },
    {
        title: 'Halloween Night',
        type: 'social',
        location: 'New York',
        imagePath: 'halloween events.jpg'
    },
    {
        title: 'Christmas Carol',
        type: 'social',
        location: 'Seattle',
        imagePath: 'christmas events.jpg'
    },
    {
        title: 'Easter Day',
        type: 'social',
        location: 'San Fransisco',
        imagePath: 'easter events.jpg'
    }
];

const productsServices = [
    { title: 'Air Conditioner' },
    { title: 'Water Heater' },
    { title: 'Washing Machine' },
    { title: 'Oven/Microwave' },
    { title: 'Plumbing' },
    { title: 'Electrical' },
    { title: 'Pest Control' },
    { title: 'Carpentry' },
    { title: 'Painting' },
    { title: 'Kitchen Cleaning' },
]


const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '40vw',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        paddingTop: '20px',
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

const useStyles = makeStyles(theme => ({
    margin: {
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing(0),
        width: "100%",
    },
}));

const Home = () => {
    const classes = useStyles();
    let history = useHistory();

    const [location, setLocation] = React.useState("");

    const handleCardClick = () => history.push("/detail");

    const handleLocation = (name) => setLocation(name);

    return (
        <Container id="home" maxWidth="xl" disableGutters>
            <Box sx={{ backgroundColor: blueGrey[100], height: '45vh'}}>
                <Box sx={{mx: 5, alignItems: 'center', mb: 5}} textAlign={"center"}>
                    <Typography variant="h1" component="div" gutterBottom>
                        Lookup
                    </Typography>
                    <Typography variant="body1" component="div" gutterBottom>
                        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                        blanditiis tenetur unde suscipit
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                    <FormControl variant="standard" sx={{ minWidth: 200, mr: 1 }}>
                        <InputLabel sx={{ pl: 1 }} id="demo-simple-select-label">Location</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={location}
                            label="Location"
                            onChange={(event) => handleLocation(event.target.value)}
                            variant="filled"
                        >
                            {locations.map(loc => <MenuItem key={loc.value} value={loc.value}>{loc.value}</MenuItem>)}
                        </Select>
                    </FormControl>

                    {/*<Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search for a service/product..."
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Search>*/}

                    <Autocomplete
                        id="free-solo-2-demo"
                        disableClearable
                        autoHighlight
                        autoSelect
                        options={productsServices.map(film => film.title)}
                        sx={{ width: '40vw', ml: 1 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search"
                                placeholder="Search for a service/product..."
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search'
                                }}
                                variant="filled"
                            />
                        )}
                    />

                    {/*<Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={[]}
                        sx={{ width: 300 }}

                        renderInput={(params) =>
                            <TextField {...params}
                                label="Search"
                                       variant="filled"
                            />}
                    />*/}

                </Box>
            </Box>
            <Box sx={{p: 5}} id="services">
                <Container sx={{marginTop: 5, marginBottom: 5}}>
                    <Typography textAlign={"center"} gutterBottom variant="h4" component="div">
                        Services
                    </Typography>

                    <Grid container spacing={2}>
                        {services.map(service => (

                            <Grid item md={2} key={service.key}>
                                <Card onClick={handleCardClick}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="150"
                                            width="250"
                                            image={`/static/images/${service.imagePath}`}
                                            alt={service.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="body1" component="div">
                                                {service.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Box sx={{backgroundColor: blueGrey[200], p: 5}} id="trending">
                <Container sx={{my: 5}}>
                    <Typography textAlign={"center"} gutterBottom variant="h4" component="div">
                        Trending
                    </Typography>
                    <Grid container spacing={2}>
                        {trending.map((trend, index) => (
                            <Grid item md={4} key={index}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            width="250"
                                            image={`/static/images/${trend.imagePath}`}
                                            alt={""}
                                        />
                                        <CardContent>
                                            <Box display="flex" justifyContent="space-between" textAlign="center">
                                                <Typography gutterBottom variant="body1" component="div">
                                                    {trend.name}
                                                </Typography>
                                                {trend.recent === 'new' && (
                                                    <CardActions disableSpacing sx={{ p: 0, mt: -2 }}>
                                                        <FiberNewOutlinedIcon fontSize="large" color={"error"} />
                                                    </CardActions>
                                                )}

                                            </Box>

                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Box sx={{p: 5}} id={"offers"}>
                <Container sx={{my: 5}}>
                    <Typography textAlign={"center"} gutterBottom variant="h4" component="div">
                        Best Offers
                    </Typography>
                    <Grid container spacing={2}>
                        {offers.map(offer => (
                            <Grid item md={4} key={offer.title}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            width="250"
                                            image={`/static/images/${offer.imagePath}`}
                                            alt={""}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="body1" component="div">
                                                {offer.title}
                                            </Typography>
                                            <Typography variant="caption" display="block" sx={{ color: blue['A200'] }}>
                                                {offer.offer}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Box sx={{backgroundColor: blueGrey[200], p: 5}} id="recommended">
                <Container sx={{my: 5}}>
                    <Typography textAlign={"center"} gutterBottom variant="h4" component="div">
                        Recommended Events
                    </Typography>
                    <Grid container spacing={2}>
                        {recommendedEvents.map(event => (
                            <Grid item md={3} key={event.title}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="150"
                                            width="250"
                                            image={`/static/images/${event.imagePath}`}
                                            alt={""}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="body1" component="div">
                                                {event.title} at <em>{event.location}</em>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Container>
    );
}

export default Home;