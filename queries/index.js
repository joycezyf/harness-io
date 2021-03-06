import gql from 'graphql-tag'

export const GET_PAGE = gql`
  query marketingSite($id: ID!) {
    marketingSite(id: $id) {
      id, heroTitle, heroSubTitle, piplineTitle, pipelineDesc, developerTitle, developerDesc, aiTitle, aiDesc, governaceTitle, governaceDesc, cdTitle, cdSubTitle, cdDesc, ciTitle, ciSubTitle, ciDesc, cloudCostTitle, cloudCostSubTitle, cloudCostDesc, featureFlagsTitle, featureFlagsSubTitle, featureFlagsDesc, chIntelTitle, chIntelSubTitle, chIntelDesc, caseStudy1, caseStudy1Client, caseStudy2, caseStudy2Client
      }
  }
`

export const GET_PAGES = gql`
  query {
    marketingSites {
      id, name, published_at, created_at, updated_at
    }
  }
`

export const GET_PRODUCT = gql`
query {
  productPlatform {
    id, published_at, created_at, updated_at, 
    title {Title,Description,subTitle},
    feature{featureTitle,FeatureIntro,imageName,link},
    quote{quoteText,quoteName},
    product{featureTitle,FeatureIntro,imageName,link},
     option{optionSubTitle,OptionTitle,optionDescription},
    secondaryTitle {Title,Description,subTitle},
}
}
`

export const GET_HOME = gql`
query {
  home {
    id, published_at, created_at, updated_at, 
    title {Title,Description,subTitle},
    feature{featureTitle,FeatureIntro,imageName,link},
    caseStudy1{quoteText,quoteName},
    caseStudy2{quoteText,quoteName},
    explore{optionSubTitle,OptionTitle,optionDescription},
    
}
}
`
