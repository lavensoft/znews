import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PostCard, DetailPostCard } from '../Card';
import { SectionTitle } from '../Titles';
import Icon from 'react-native-vector-icons/Ionicons'; 

import { articlesGroupStyles, sectionBreakStyles } from './styles';

export const ArticlesGroup = ({ onPressMore, onPressArticle, onPressAdd, addActionDone, title, titleColor, subtitle, subtitleColor, description, articles }) => {
    return(
        <View style={articlesGroupStyles.container}>
            <SectionTitle
                title={title}
                titleColor={titleColor}
                subtitle={subtitle}
                subtitleColor={subtitleColor}
                description={description}
                onPressMore={onPressMore}
                onPressAdd={onPressAdd}
                addActionDone={addActionDone}
            />
            {
              articles.map((article, index) => {
                if(index == 0) {
                  return (
                    <PostCard 
                      key={`article-item-${index}`}
                      onPress={() => onPressArticle(article)}
                      originIcon={article.author.avatar}
                      originTitle={article.author.name}
                      title={article.title}
                      banner={article.thumbnail}
                      date={article.dateAdded}
                    />
                  )
                }
                return(
                  <DetailPostCard 
                    key={`article-item-${index}`}
                    onPress={() => onPressArticle(article)}
                    originIcon={article.author.avatar}
                    subtitle={article.author.name}
                    title={article.title}
                    banner={article.thumbnail}
                    date={article.dateAdded}
                  />
                )
              })
            }
        </View>
    )
}

export const SectionBreak = ({ icon, title, description }) => {
    return (
        <View style={sectionBreakStyles.container}>
            {
                icon ?
                <Icon
                    style={sectionBreakStyles.icon}
                    name={icon}
                /> : null
            }
            {
                title ?
                <Text style={sectionBreakStyles.title}>{title}</Text> : null
            }
            {
                description ?
                <Text style={sectionBreakStyles.description}>{description}</Text> : null
            }
        </View>
    )
}