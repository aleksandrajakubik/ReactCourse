import React, { useState } from 'react';
import { CssBaseline, Button, IconButton, Icon, Container, Card, CardActions, CardContent, Typography, CardHeader, Avatar, CardMedia } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  media: {
    height: 200
  },
  readMore: {
    marginLeft: "auto"
  },
  avatar: {
    backgroundColor: "orangered"
  },
  card: {
    margin: 15
  },
  like: {
    color: "red"
  }
});

function ArticleCard({ author, avatar, title, image, firstSentence }) {
    const classes = useStyles();
    const [like, setLike] = useState(false);

    function handleClick() {
      setLike(prevState => !prevState)
    }

    return (
      <Card className={classes.card}>
        <CardHeader 
        avatar={<Avatar className={classes.avatar}>{avatar}</Avatar>}
          title={author}
          subheader="Joined 2020-09-21"
        />
        <CardMedia
          className={classes.media}
          image={image} 
        />
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{firstSentence}</Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick = {handleClick} className={like ? classes.like : ""}>
            <Icon>favorite</Icon>
          </IconButton>
          <IconButton>
            <Icon>share</Icon>
          </IconButton>
          <Button className={classes.readMore} variant="outlined" color="primary">Read more</Button>
        </CardActions>
      </Card>
    )
}

function App() {
  return (
    <div className="App">
      <CssBaseline>
        <Container>
          <ArticleCard author="John Smith" avatar="JS" title="Something clickbait" image="https://picsum.photos/id/1018/600/400" firstSentence="It's really interesting"/>
          <ArticleCard author="Jane Doe" avatar="JD" title="Peaceful sea" image="https://picsum.photos/id/10/600/400" firstSentence="I found greate picture!"/>
          <ArticleCard author="Steve Newman" avatar="SN" title="Being a dad" image="https://picsum.photos/id/1001/600/400" firstSentence="Being a dad is a hard job"/>
        </Container>
      </CssBaseline>
    </div>
  );
}

export default App;



