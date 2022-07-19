import axios from "axios";

export default async function setCategories(change: any, context: any)  {
    // ... Your code here
    const data = change.after.data();
    const changeRef = change.after.ref
    // const prevData = change.before.data();

    const categories = data?.categories

    if(data?.categories) {
        const cats: any = []
        categories.forEach( (cat: number) => {
            axios.get(`${change.after.data?.source.base_url}/categories/${cat}`)
            .then( (data) => {
                cats.push({
                    name: data.data().name, 
                    description: data.data().description, 
                    slug: data.data().slug
                })
            })
        })
        
        changeRef.set({ categories: [cats] }, { merge: true })
    }


    return 
}
