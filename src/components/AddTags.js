import React, { useState } from 'react';
import './../App.css';

const AddTags = () => {
  const [tags, setTags] = useState({ tag: '' });
  const [selectedTags, setSelectedTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const storedTags = JSON.parse(localStorage.getItem('selectedTags'));

  //   Handle Input change
  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      const newTag = { ...tags };
      newTag[e.target.name] = e.target.value;
      newTag.newValue = true;
      newTag.id = Math.random() * 1000;
      setTags(newTag);

      setSuggestions(
        storedTags.filter((flTAgs) => {
          return (
            flTAgs.tag
              .toLowerCase()
              .indexOf(e.target.value.toLocaleLowerCase()) !== -1
          );
        })
      );
    }
  };

  //Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags.newValue) {
      setSelectedTags((oldTags) => [...oldTags, tags]);
      setTags({ tag: '' });
      localStorage.setItem('selectedTags', JSON.stringify(selectedTags));
    }
  };

  //Handle Click from suggestion
  const handleSuggestionClick = (myTag) => {
    console.log('clicked from suggestion list', myTag);
    const newTag = { tag: myTag, newValue: true, id: Math.random() * 1000 };
    setSelectedTags((oldTags) => [...oldTags, newTag]);
    setTags({ tag: '' });
  };

  //Handle Remove Tag
  const removeTag = (id) => {
    setSelectedTags(selectedTags.filter((item) => item.id !== id));
  };

  //Render JSX
  return (
    <div className='main-content'>
      {/* show tag list */}
      <p className='title'>Tags</p>
      {selectedTags.length > 0 && (
        <div className='selected-tags'>
          {' '}
          {selectedTags.map((tags) => (
            <p key={tags.id}>
              {tags.tag}{' '}
              <button className='remove' onClick={() => removeTag(tags.id)}>
                X
              </button>
            </p>
          ))}
        </div>
      )}

      <div className='form-suggestions'>
        <form action='' onSubmit={(e) => handleSubmit(e)}>
          <label>Add new tag</label>
          <input
            type='text'
            name='tag'
            onChange={handleChange}
            value={tags.tag}
            placeholder='Add tag'
            required
          />
          <button type='submit'>Add</button>
        </form>

        {suggestions.length > 0 && (
          <div className='suggestion-box'>
            {suggestions.map((suggest) => {
              return (
                <li
                  value={suggest.tag}
                  onClick={() => handleSuggestionClick(suggest.tag)}
                >
                  {suggest.tag}
                </li>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTags;
