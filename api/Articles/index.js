import axios from 'axios';
import config from '../config';

const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
};

const ArticlesAPI = {
    getAll: async () => {
        const response = await axios.get(`${config.API_URL}/articles`);
        return response.data;
    },
    getAt: async (page) => {
        const response = await axios.get(`${config.API_URL}/articles/page/${page}`);
        return response.data;
    },
    search: async(keywords) => {
        const response = await axios.post(`${config.API_URL}/articles/search`, {
            value: keywords
        });

        return response.data;
    },
    getStories: async() => {
        let result = await axios.get(`${config.API_URL}/articles`);
        result = result.data.data;

        let stories = [];

        //*Group by sites
        let sites = groupBy(result, 'originTitle');
        let sitesTitle = Object.keys(sites);
        sites = Object.values(sites);

        for(var i = 0; i < sites.length; i++) {
            let site = sites[i];
            if(site.length > 10) {
                site = site.slice(0, 10);
            }

            let siteTitle = sitesTitle[i];
            let siteData = {
                title: siteTitle,
                originTitle: siteTitle,
                originIcon: site[0].originIcon,
                stories: site
            }

            stories.push(siteData);
        }

        return {
            data: stories
        };
    }
}

export default ArticlesAPI;