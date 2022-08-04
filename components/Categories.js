import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import sanityClient, { urlFor } from '../sanity';
import CategoryCard from './CategoryCard'

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "category"]
    `).then(data => {
      setCategories(data);
    })
  },[]);

  return (
    <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10
        }}
    >
      {categories.map(category => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}

    </ScrollView>
  )
}

export default Categories