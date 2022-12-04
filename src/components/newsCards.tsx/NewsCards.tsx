import React from 'react';
import NewsCard from '../newsCard/NewsCard';
import { Grow, Grid, Typography } from '@material-ui/core';
import useStyles from './styles';

const NewsCards = ({ articles, activeArticle }: any) => {
    const style = useStyles();
    if (articles && !articles.length) {
        return (
            <Grow in>
                <Grid className={style.container} container alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={style.infoCard}>
                            <div className={style.card}>
                                <Typography variant="h5" component="h3" color="textPrimary">Try those messages</Typography>
                                <Typography variant="h6" component="h3" color="textPrimary">Give me the latest news from (CNN | Usa-today | Wired | BBC News | Time | IGN | Buzzfeed | etc...)</Typography>
                                <Typography variant="h6" component="h3" color="textPrimary">Give me the latest Sports news</Typography>
                                <Typography variant="h6" component="h3" color="textPrimary">Give me the latest news from (CNN | Usa-today | etc...)</Typography>
                            </div>
                        </Grid>
                </Grid>
            </Grow>
        );
    }

    return (
        <Grow in>
            <Grid className={style.container} container alignItems={'stretch'} spacing={3}>
                {articles.map((article: any, index: number) => {
                    console.log(index);
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }} key={index}>
                            <NewsCard article={article} activeArticle={activeArticle} index={index} />
                        </Grid>
                    )
                })}
            </Grid>
        </Grow>
    );
};

export default NewsCards;