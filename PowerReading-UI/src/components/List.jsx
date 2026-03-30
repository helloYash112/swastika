import CreatableSelect from 'react-select/creatable'; 

export default function List({ options, title, onChange,createNewEntry, value }) {
  return (
    <CreatableSelect 
      id={title}
      options={options} 
      onChange={onChange}   
      value={value}   
      onCreateOption={createNewEntry}     
      isClearable
      placeholder={`Select or type ${title}...`}
    />
  );
}
