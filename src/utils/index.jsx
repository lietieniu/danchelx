import { Select } from "antd";
export default{
    renderSelect(list){
      const selectList=[];
      if(list.length==0||!list){
          return [];
      }else{
          list.map((item,index)=>{
            selectList.push(<Select.Option value={item.key} key={index}>{item.name}</Select.Option>)
          })
      };
      return selectList;
    }
}