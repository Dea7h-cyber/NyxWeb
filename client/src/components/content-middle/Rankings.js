import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';

// Helpers
import { getClassName, getClassImage } from '../../helpers/Character';

export default () => {
  const [characters, setCharacters] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoader(true);

    (async () => {
      try {
        const result = await axios('/api/characters');
        setCharacters(result.data);
      } catch (error) {
        setError('Couldn\'t load data');
      } finally {
        setLoader(false);
      }
    })();
  }, []);

  return (
    <>
      <h1 className='content-title'>rankings</h1>
      <section className='content-body padding'>
        <div className='rankings-table'>
          {error ? error : (
            characters.data
              ? characters.data.map((char, index) => <Character key={char.id} char={{ ...char, index }} />)
              : 'No characters'
          )}
        </div>
        <Loader
          type='Triangle'
          color='Green'
          height={50}
          width={50}
          visible={loader}
          style={{ textAlign: 'center', padding: '15px' }}
        />
      </section>
    </>
  );
};

const Character = ({ char: { index, Name, Class, Resets, cLevel } }) => (
  <div className='character'>
    <div className='name'>
      {index + 1}.&nbsp;
        <Link to={`/profile/${Name}`}>{Name}</Link>
    </div>
    <div className='image'>
      <img src={getClassImage(Class)} alt={Class} />
    </div>
    <div className='info'>
      <div>{getClassName(Class)}</div>
      <div>Resets: {Resets}</div>
      <div>Level: {cLevel}</div>
    </div>
  </div>
);
