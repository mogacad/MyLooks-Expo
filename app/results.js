import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Import environment utilities for secure API access
import { getOpenAIApiKey } from '../utils/environment';
import ResultsScreen from '../components/screens/ResultsScreen';

export default function Results() {
  const { imageUrl } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [generatingRoutine, setGeneratingRoutine] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      analyzeImage(imageUrl);
    } else {
      setError("No image URL provided");
      setLoading(false);
    }
  }, [imageUrl]);

  const analyzeImage = async (url) => {
    setLoading(true);
    try {
      const openaiApiKey = getOpenAIApiKey();
      if (!openaiApiKey) {
        throw new Error("OpenAI API key not available");
      }

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4-vision-preview",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Analyze this face for a beauty rating app. Provide the following in JSON format only: 1) An overall score from 1-10 (as a number), 2) Facial symmetry score 1-10 (as a number), 3) Skin health score 1-10 (as a number), 4) Style score 1-10 (as a number), 5) A brief assessment (max 2 sentences). The format should be: {\"overall\": 7.5, \"facialSymmetry\": 8, \"skinHealth\": 7, \"style\": 6, \"assessment\": \"Your assessment here\"}. Only return valid JSON, no other text."
                },
                {
                  type: "image_url",
                  image_url: {
                    url: url
                  }
                }
              ]
            }
          ],
          max_tokens: 1000
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
          }
        }
      );

      // Extract and parse the JSON from the response
      const content = response.data.choices[0].message.content;
      const cleanedContent = content.replace(/```json|```/g, '').trim();
      
      // Ensure we're parsing valid JSON
      try {
        const parsedResults = JSON.parse(cleanedContent);
        
        // Ensure all score fields are numbers
        const validatedResults = {
          ...parsedResults,
          overall: typeof parsedResults.overall === 'number' ? parsedResults.overall : Number(parsedResults.overall),
          facialSymmetry: typeof parsedResults.facialSymmetry === 'number' ? parsedResults.facialSymmetry : Number(parsedResults.facialSymmetry),
          skinHealth: typeof parsedResults.skinHealth === 'number' ? parsedResults.skinHealth : Number(parsedResults.skinHealth),
          style: typeof parsedResults.style === 'number' ? parsedResults.style : Number(parsedResults.style)
        };
        
        // Save results to state and AsyncStorage
        setResults(validatedResults);
        await AsyncStorage.setItem('lastResults', JSON.stringify(validatedResults));
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError, "Content:", cleanedContent);
        setError("Error parsing AI response");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRoutine = async () => {
    if (!results) return;
    
    setGeneratingRoutine(true);
    try {
      const openaiApiKey = getOpenAIApiKey();
      if (!openaiApiKey) {
        throw new Error("OpenAI API key not available");
      }

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a beauty and skincare expert. Create personalized routines based on facial analysis scores."
            },
            {
              role: "user",
              content: `Based on these scores: Overall: ${results.overall}, Facial Symmetry: ${results.facialSymmetry}, Skin Health: ${results.skinHealth}, Style: ${results.style}, and this assessment: "${results.assessment}", create a personalized routine with specific product recommendations and daily practices. Format as JSON with these sections: skincare (morning and evening steps), haircare (weekly routine), makeup (if applicable), and style (clothing recommendations). Each section should have 3-5 specific, actionable recommendations.`
            }
          ],
          max_tokens: 1500
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
          }
        }
      );

      // Extract and parse the JSON from the response
      const content = response.data.choices[0].message.content;
      const cleanedContent = content.replace(/```json|```/g, '').trim();
      
      // Parse and store the routine
      try {
        const routineData = JSON.parse(cleanedContent);
        await AsyncStorage.setItem('personalRoutine', JSON.stringify(routineData));
        
        // Navigate to the routine screen
        router.push('/routine');
      } catch (jsonError) {
        console.error("Error parsing routine JSON:", jsonError);
        setError("Failed to create your personal routine. Please try again.");
      }
    } catch (error) {
      console.error("Routine generation error:", error);
      setError("Failed to create your personal routine. Please try again.");
    } finally {
      setGeneratingRoutine(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(26, 9, 51, 0.8)', 'rgba(14, 26, 77, 0.85)']}
        style={styles.background}
      >
        <ResultsScreen 
          results={results}
          imageUrl={imageUrl}
          loading={loading}
          error={error}
          isGeneratingRoutine={generatingRoutine}
          onGenerateRoutine={handleGenerateRoutine}
          onRetry={() => router.push('/upload')}
          onGoHome={() => router.push('/')}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
