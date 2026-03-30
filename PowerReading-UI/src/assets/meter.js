 export const meters=[
     { name: 'swastiks-home', id: '123-456-789' },
    { name: 'swastika-machine', id: '789-456-123' },
    { name: 'oil-mill-home', id: '159-753-852' },

]
const today = new Date();
const yesterday=new Date();
yesterday.setDate(today.getDate()-1);

const lastWeek = new Date();
lastWeek.setDate(today.getDate() - 7);

const lastMonth = new Date();
lastMonth.setMonth(today.getMonth() - 1);

export const dates = [
  { value: today.toISOString(), label: 'Today' },
  {value:yesterday.toISOString(),label:'Yesterday'},
  { value: lastWeek.toISOString(), label: 'Last Week' },
  { value: lastMonth.toISOString(), label: 'Last Month' }
];
export const viewMeters=[
    {
      value:meters[0].id,label:meters[0].name
    },
    {
        value:meters[1].id,label:meters[1].name

    },
    {
        value:meters[2].id,label:meters[2].name

    }
]
