import {YoutubeLoader  } from "@langchain/community/document_loaders/web/youtube"

export async function LoadDataYT(url:string): Promise<Record<string, any>> {
        const loader = YoutubeLoader.createFromUrl(url , {
                language:"en",
                addVideoInfo:true
        })
        const doc = await loader.load()
        return doc
}