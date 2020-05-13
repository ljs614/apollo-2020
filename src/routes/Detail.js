import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIE = gql`
    query getMovie($id: Int!) {
        movie(id: $id) {
            title
            medium_cover_image
            language
            rating
            description_intro
        }
        suggestions(id: $id) {
            id
            medium_cover_image
        }
    }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #32ff7e, #18dcff);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  flex-direction: column;
  padding-top: 20px;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  min-height: 400px;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 26px;
`;

const Poster = styled.div`
    background-image: url(${props => props.bg});
    width: 20%;
    height: 100%;
    background-color: transparent;
    background-size: cover;
    background-position: center center;
`;

const Suggstions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
`;

export default () => {
    const { id } = useParams();
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id: Number(id) }
    });
    
    return (
        <Container>
          {loading? <Title>Loading ...</Title> : 
          <>
            <Row>
              <Column>
                <Title>{loading? "Loading ..." : data?.movie?.title}</Title>
                <Subtitle>{data?.movie?.language} {data?.movie? "∙" :""} {data?.movie?.rating}</Subtitle>
                <Description>{data?.movie?.description_intro}</Description>
              </Column>
              <Poster bg={data?.movie?.medium_cover_image}></Poster>
            </Row>
            <Row>
              <Suggstions>
                {data?.suggestions?.map(s => (
                  <Movie key={s.id} id={s.id} bg={s.medium_cover_image}/>
                ))}
              </Suggstions>
            </Row>
          </>
          }
          
        </Container>
    );
};