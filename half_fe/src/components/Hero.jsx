//import React from 'react';
import styled from "styled-components";
import { other_images } from './utils/images';

const Hero = () => {
    return (
        <HeroWrapper className = "bg-black">
            <div className='container h-100 flex'>
                <div className='hero-content'>
                    <h1>Online Art Course</h1>
                    <p>Find what you feel interseted on the ArtQuack website</p>
                    <a href="/register" className="joinbtn">Start for free</a>
                </div>
            </div>
        </HeroWrapper>
    )
}

const HeroWrapper = styled.div`
  background: url(${other_images.hero_img}) center/cover no-repeat;
  height: 300px;

  .container{
    .hero-content{
      background-color: var(--clr-white);
      max-width: 400px;
      width: 100%;
      margin-left: 0;
      padding: 20px;

      h1{
        font-size: 32px;
        margin-bottom: 5px;
        white-space: nowrap;
      }
      p{
        font-size: 15px;
      }
      a.joinbtn{
        background-color: #fc4a1a;
        color: #fff;
        padding: 8px 20px;
        transition: .4s ease-in-out;
      }
      a.joinbtn:hover{
        border-radius: 15px; 
      }
    }
  }
`;

export default Hero