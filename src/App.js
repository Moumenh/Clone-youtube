import React from 'react'

import { Grid } from '@material-ui/core'

import  SearchBar from './components/SearchBar'
import  VideoDetail from './components/VideoDetail'
import  VideoList from './components/VideoList'

import youtube from './api/youtube'

class App extends React.Component {

    state = {
        videos : [],
        selecetedVideo: null
    }

    componentDidMount(){
        this.handleSubmit('momoCOM123')
    }

    onVideoSelect = (video) => {
        this.setState({ selecetedVideo: video })
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: 'AIzaSyBjAOsyK9SkqLnSWpPdG4H5VkCcp2aLfF8',
                q: searchTerm
            }
        });
        this.setState({videos : response.data.items, selecetedVideo : response.data.items[0]})
    }

    render(){
        return(
            <Grid justify='center' container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={this.state.selecetedVideo}/>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;