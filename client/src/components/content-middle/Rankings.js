import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';

// Helpers
import { getClassName, getClassImage } from '../../helpers/Character';

export default () => {
  const [characters, setCharacters] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);

    (async () => {
      try {
        const result = await axios('/api/characters');
        setCharacters(result.data);
      } catch (error) {
        console.error('error', error);
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
          {characters.length > 0
            ? characters.map((char, index) => (
                <Character key={char.id} char={{ ...char, index }} />
              ))
            : 'No characters'}
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

function Character({ char }) {
  return (
    <div className='character'>
      <div className='name'>
        {char.index + 1}.&nbsp;
        <Link to={`/profile/${char.Name}`}>{char.Name}</Link>
      </div>
      <div className='image'>
        <img src={getClassImage(char.Class)} alt={char.Class} />
      </div>
      <div className='info'>
        <div>{getClassName(char.Class)}</div>
        <div>Resets: {char.Resets}</div>
        <div>Level: {char.cLevel}</div>
      </div>
    </div>
  );
}
