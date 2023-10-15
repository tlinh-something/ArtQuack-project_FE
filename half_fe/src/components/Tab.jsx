import {useState} from 'react';
import styled from "styled-components";
import Course from "./Course";
import {POTTERY,OIL,INLAY,ENGRAVED_COPPER,SAND,SPRAY} from "./utils/constants";
import courses from './utils/data';


const Tabs = () => {
  const [activeTab, setActiveTab] = useState(POTTERY);
  const tabHandler = (category) => {
    setActiveTab(category);
  }

  return (
    <TabsWrapper>
      <div className='tabs'>
        <ul className='flex flex-wrap'>
          <li className='tabs-head-item'>
            <button type = "button" className={`tab-btn ${activeTab === POTTERY}`} onClick = {() => tabHandler(POTTERY)}>Pottery</button>
          </li>
          <li className='tabs-head-item'>
            <button type = "button" className={`tab-btn ${activeTab === OIL}`} onClick = {() => tabHandler(OIL)}>Oil Painting</button>
          </li>
          <li className='tabs-head-item'>
            <button type = "button" className={`tab-btn ${activeTab === INLAY}`} onClick = {() => tabHandler(INLAY)}>Inlay</button>
          </li>
          <li className='tabs-head-item'>
            <button type = "button" className={`tab-btn ${activeTab === ENGRAVED_COPPER}`} onClick = {() => tabHandler(ENGRAVED_COPPER)}>Engraved Copper</button>
          </li>
          <li className='tabs-head-item'>
            <button type = "button" className={`tab-btn ${activeTab === SAND}`} onClick = {() => tabHandler(SAND)}>Sand</button>
          </li>
          <li className='tabs-head-item'>
            <button type = "button" className={`tab-btn ${activeTab === SPRAY}`} onClick = {() => tabHandler(SPRAY)}>Spary</button>
          </li>
        </ul>

        <div className='tabs-body'>
          {
            courses.filter(course => course.category === activeTab).map((course) => (
              <Course key = {course.id} {...course} />
            ))
          }
        </div>
      </div>
    </TabsWrapper>
    
  )
}

const TabsWrapper = styled.div`
  .tabs{
    margin-top: 16px;
    .tabs-head-item button{
      border: 1px solid rgba(0, 0, 0, 0.7);
      padding: 10px 13px;
      margin-right: 6px;
      transition: var(--transition);
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;

      &:hover{
        background-color: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .tabs-body{
      margin-top: 32px;
    }

    @media screen and (min-width: 600px){
      .tabs-body{
        display: grid;
        gap: 26px;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 992px){
      .tabs-body{
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 1400px){
      .tabs-body{
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`;

export default Tabs