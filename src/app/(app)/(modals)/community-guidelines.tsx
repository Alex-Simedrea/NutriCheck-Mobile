import { ScrollView, Text } from 'react-native';
import Caption from '@/components/caption';

export default function CommunityGuidelines() {
  return (
    <ScrollView
      className={'bg-white dark:bg-background-900'}
      contentContainerClassName={'px-4 pb-20'}
    >
      <Caption text='Community Guidelines:' />
      <Text className={'dark:text-white py-1 text-lg'}>
        1. Respectful Communication: Treat others with kindness, respect, and
        empathy. Avoid offensive language, personal attacks, or discrimination
        based on race, gender, religion, sexual orientation, or any other
        personal attribute.
      </Text>
      <Text className={'dark:text-white py-1 text-lg'}>
        2. Authenticity and Transparency: Share genuine insights, recommendations,
        and success stories related to nutrition. Be honest about your
        experiences and disclose any potential conflicts of interest or
        affiliations.
      </Text>
      <Text className={'dark:text-white py-1 text-lg'}>
        3. Evidence-based Information: When providing recommendations or insights,
        strive to base them on credible sources such as scientific research,
        reputable publications, or personal experiences backed by evidence.
        Avoid spreading misinformation or promoting unproven claims.
      </Text>
      <Text className={'dark:text-white py-1 text-lg'}>
        4. Constructive Feedback: Offer feedback and constructive criticism in a
        courteous manner. Focus on providing helpful insights that contribute to
        the community's collective learning and growth.
      </Text>
      <Text className={'dark:text-white py-1 text-lg'}>
        5. Privacy and Confidentiality: Respect the privacy and confidentiality of
        others. Avoid sharing personal information without consent, including
        but not limited to contact details, medical history, or sensitive data.
      </Text>
      <Text className={'dark:text-white py-1 text-lg'}>
        6. Relevant Content: Keep posts relevant to the theme of nutrition,
        wellness, and healthy living. Avoid off-topic discussions or content
        unrelated to the app's purpose.
      </Text>
      <Text className={'dark:text-white py-1 text-lg'}>
        7. Compliance with Laws and Regulations: Ensure that all content shared
        complies with applicable laws and regulations, including copyright laws,
        intellectual property rights, and restrictions on health-related claims
        or advertisements.
      </Text>
      <Text className={'dark:text-white py-1 text-lg'}>
        8. Moderation and Reporting: Report any content or behavior that violates
        these guidelines or the terms of service. Trust the moderation team to
        address issues promptly and fairly.
      </Text>
      <Text className={'dark:text-white py-1 text-lg'}>
        9. Empowerment and Support: Foster a supportive environment where users
        feel empowered to share their experiences, seek advice, and support one
        another on their nutrition journeys.
      </Text>
      <Text className={'dark:text-white py-1 text-lg'}>
        10. Continuous Improvement: Provide feedback on ways to improve the app and
        community experience. Together, we can create a positive and enriching
        space for all users.
      </Text>
    </ScrollView>
  );
}
