import { fireStore } from '../../../database'
import WP from '../../../scrapper/wordpress';

export default function Sites () {
    const sites: any = []

    fireStore.collection("sites").get().then( (site) => {
        site.forEach( (data) => {
            const url: string = `${data.data().base_url}`
            const wp = new WP({
                base_url: url, 
                posts_url: '/posts', 
                media_url: '/media/', 
                user_url: '/users/', 
                category_url: '/categories/',
                tags_url: '/tags/',
                source: data.data()
            })
            wp.posts()
        })
    })
    
    return sites
}
