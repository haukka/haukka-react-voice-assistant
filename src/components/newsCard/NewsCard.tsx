import React from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classNames from 'classnames';
import useStyles from './styles';

const NewsCard = ({ article, activeArticle, index }: any) => {
    const {description, publishedAt, source, title, url, urlToImage}: any = article;
    const formattedDate = new Date(publishedAt).toDateString();
    const style = useStyles();

    console.log(index);
    return (
        <Card className={classNames(style.card, activeArticle === index ? style.activeCard : null)}>
            <CardActionArea href={url} target={'_blank'}>
                <CardMedia image={urlToImage || null} className={style.media} />
                <div className={style.details}>
                    <Typography variant={'body2'} color={'textSecondary'} component={'h2'}>{formattedDate}</Typography>
                    <Typography variant={'body2'} color={'textSecondary'} component={'h2'}>{source.name}</Typography>
                </div>
                <Typography className={style.title} variant={'h5'} gutterBottom>{title}</Typography>
                <CardContent>
                    <Typography variant={'body2'} color={'textSecondary'} component={'p'}>{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={style.cardActions}>
                <Button color={'primary'} size={'small'} href={url}>Learn more</Button>
                <Typography variant={'h5'} color={'textSecondary'}>{index + 1}</Typography>
            </CardActions>
        </Card>
    );
};

export default NewsCard;