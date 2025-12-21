import HighlightItem from "./HighlightItem";
const Highlight = () => {
    const post = [
        {
            heading: 'Delhi Police Detain Over 100 Protesters at India Gate Amid Severe Air Pollution',
            time: "18 hours ago"
        },

        {
            heading: 'Delhi Police Detain Over 100 Protesters at India Gate Amid Severe Air Pollution',
            time: "18 hours ago"
        },

        {
            heading: 'Delhi Police Detain Over 100 Protesters at India Gate Amid Severe Air Pollution',
            time: "18 hours ago"
        }
    ]

    const HighlightItems = post.map((item: any, index:any) => {
        return(
            <HighlightItem key={index} heading={item.heading} time={item.time}/>
        )
    })
      
    return (
        <div className="highlight-container border rounded-2xl border-border">
            <div className="highlight-container-heading p-3 text-xl font-extrabold">Today's news</div>
            {HighlightItems}
        </div>
    )
}

export default Highlight;