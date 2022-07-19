import axios from "axios"
import { URLs } from './scrapper.interface'
import { fireStore } from '../database'

export default class WP {
    data: URLs
    source: {}

    constructor (data: URLs) {
        this.data = data,
        this.source = data.source
    }

    posts () {
        // console.log("starting scrapper => " + this.data.base_url)
        axios.get(`${this.data.base_url}${this.data.posts_url}`).then( async (data) => {
            data.data.forEach(async (el: any) => {
                const post : any = {
                    source: this.data.source,
                    post_type: "wp",
                    id: el.id,
                    title: el.title.rendered,
                    categories: await this.categories(el.categories),
                    author: await this.author(el.author),
                    tags: await this.getTags(el.tags),
                    featured_media: await this.featuredImage(el.featured_media),
                    status: el.status,
                    slug: el.slug,
                    created_at: el.date_gmt,
                    updated_at: el.modified,
                    content: el.content.rendered,
                    timestamp: new Date().getTime()
                }

                setTimeout(() => {
                    const match = fireStore.collection("articles").where("title", "==", post.title)
                    match.get().then( (doc) => {
                        if(doc.size < 1) {
                            // console.log(post)
                            fireStore.collection("articles").add(post)
                        }
                    })
                    // console.log(post)
                }, 800)
                
            });
        }).catch( (e) => {
            console.log(e)
        })

        // console.log("Ended scrapper => " + this.data.base_url)
    }

    async categories (categories: any) {
        const category : any = []
        categories.forEach((cat: any) => {
            const url = `${this.data.base_url}/categories/${cat}`
            axios.get(url)
            .then( (data: any) => {
                const cat =  data.data
                category.push({ id: cat.id, name: cat.name, description: cat.description})
            })
            .catch(() => {
                return 
            })
            
        })
        return category
    }

    async getTags (tags: any) {
        const tagList : any = []
        tags.forEach((tag: any) => {
            const url = `${this.data.base_url}/categories/${tag}`
            axios.get(url)
            .then( (data: any) => {
                const tag =  data.data
                tagList.push({ id: tag.id, name: tag.name, description: tag.description})
            })
            .catch( () => {
                return 
            })
            
        })
        return tagList
    }

    async featuredImage (imageId: number) {
        const image : any = { url: '', fearured: false, id: null }
        if(imageId){
            axios.get(`${this.data.base_url}/media/${imageId}`)
            .then( (data) => {
                const img = data.data
                image.url = img?.guid.rendered
                image.fearured = true
                image.id = imageId
            })
            .catch( () => {
                return 
            })
        }

        return image
    }

    async author (uid: number) {
        const user : any = { id: null, name: '', description: '', external_link: '', slug: '', avatar: { small: '', medium: '', large: '' }}
        await axios.get(`${this.data.base_url}/users/${uid}`)
        .then( (data) => {
            // console.log(data.data)
            const r  = data.data
            user.id = r.id
            user.name = r.name
            user.description = r.description
            user.external_link = r.link
            user.slug = r.slug
            user.avatar = { 
                small: r.avatar_urls['24'], 
                medium: r.avatar_urls['48'], 
                large: r.avatar_urls['96'] 
            }

        })
        .catch( () => {
            return 
        })
        // console.log(user)
        return user
    }

}
