import { observable,action } from 'mobx';
class Store{
   @observable favorite = {
        默认收藏:[{
            key: 1,
            siteTitle: "搂特网",
            hits: 0,
            public:"否",
            url: "http://www.loturl.com/"
          }],
        react:[{
            key: 1,
            siteTitle: "搂特网",
            hits: 0,
            public:"否",
            url: "http://www.loturl.com/"
          },{
            key: 2,
            siteTitle: "搂特网",
            hits: 0,
            public:"否",
            url: "http://www.loturl.com/"
          }],
        mobx:[{
            key: 1,
            siteTitle: "搂特网",
            hits: 0,
            public:"否",
            url: "http://www.loturl.com/"
          },{
            key: 2,
            siteTitle: "搂特网",
            hits: 0,
            public:"否",
            url: "http://www.loturl.com/"
          },{
            key: 3,
            siteTitle: "搂特网",
            hits: 0,
            public:"否",
            url: "http://www.loturl.com/"
          }],
        _selectKey:"默认收藏",
        _addFavorite:action.bound((siteData)=>{
            //组建内没有地方引用favorite.默认收藏则不触发render
            console.log("触发action");
            this.favorite.默认收藏.unshift(siteData);
        })
    };
}

export default new Store();