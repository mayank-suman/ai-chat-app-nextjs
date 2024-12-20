import type { Config } from 'tailwindcss';
import form from '@tailwindcss/forms';

export default {
  content: ['./src/**/*.{html,jsx,js,tsx,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        light: {
          primary: '#096B5A',
          surfaceTint: '#096B5A',
          onPrimary: '#FFFFFF',
          primaryContainer: '#A1F2DC',
          onPrimaryContainer: '#00201A',
          secondary: '#4B635C',
          onSecondary: '#FFFFFF',
          secondaryContainer: '#CDE8DF',
          onSecondaryContainer: '#07201A',
          tertiary: '#426277',
          onTertiary: '#FFFFFF',
          tertiaryContainer: '#C7E7FF',
          onTertiaryContainer: '#001E2E',
          error: '#BA1A1A',
          onError: '#FFFFFF',
          errorContainer: '#FFDAD6',
          onErrorContainer: '#410002',
          background: '#F5FBF7',
          onBackground: '#171D1B',
          surface: '#F5FBF7',
          onSurface: '#171D1B',
          surfaceVariant: '#DBE5E0',
          onSurfaceVariant: '#3F4945',
          outline: '#6F7975',
          outlineVariant: '#BFC9C4',
          shadow: '#000000',
          scrim: '#000000',
          inverseSurface: '#2B322F',
          inverseOnSurface: '#ECF2EE',
          inversePrimary: '#85D6C1',
          primaryFixed: '#A1F2DC',
          onPrimaryFixed: '#00201A',
          primaryFixedDim: '#85D6C1',
          onPrimaryFixedVariant: '#005143',
          secondaryFixed: '#CDE8DF',
          onSecondaryFixed: '#07201A',
          secondaryFixedDim: '#B1CCC3',
          onSecondaryFixedVariant: '#334B45',
          tertiaryFixed: '#C7E7FF',
          onTertiaryFixed: '#001E2E',
          tertiaryFixedDim: '#AACBE3',
          onTertiaryFixedVariant: '#2A4A5F',
          surfaceDim: '#D5DBD8',
          surfaceBright: '#F5FBF7',
          surfaceContainerLowest: '#FFFFFF',
          surfaceContainerLow: '#EFF5F1',
          surfaceContainer: '#E9EFEC',
          surfaceContainerHigh: '#E3EAE6',
          surfaceContainerHighest: '#DEE4E0',
        },
        dark: {
          primary: '#85D6C1',
          surfaceTint: '#85D6C1',
          onPrimary: '#00382E',
          primaryContainer: '#005143',
          onPrimaryContainer: '#A1F2DC',
          secondary: '#B1CCC3',
          onSecondary: '#1D352F',
          secondaryContainer: '#334B45',
          onSecondaryContainer: '#CDE8DF',
          tertiary: '#AACBE3',
          onTertiary: '#103447',
          tertiaryContainer: '#2A4A5F',
          onTertiaryContainer: '#C7E7FF',
          error: '#FFB4AB',
          onError: '#690005',
          errorContainer: '#93000A',
          onErrorContainer: '#FFDAD6',
          background: '#0E1513',
          onBackground: '#DEE4E0',
          surface: '#0E1513',
          onSurface: '#DEE4E0',
          surfaceVariant: '#3F4945',
          onSurfaceVariant: '#BFC9C4',
          outline: '#89938F',
          outlineVariant: '#3F4945',
          shadow: '#000000',
          scrim: '#000000',
          inverseSurface: '#DEE4E0',
          inverseOnSurface: '#2B322F',
          inversePrimary: '#096B5A',
          primaryFixed: '#A1F2DC',
          onPrimaryFixed: '#00201A',
          primaryFixedDim: '#85D6C1',
          onPrimaryFixedVariant: '#005143',
          secondaryFixed: '#CDE8DF',
          onSecondaryFixed: '#07201A',
          secondaryFixedDim: '#B1CCC3',
          onSecondaryFixedVariant: '#334B45',
          tertiaryFixed: '#C7E7FF',
          onTertiaryFixed: '#001E2E',
          tertiaryFixedDim: '#AACBE3',
          onTertiaryFixedVariant: '#2A4A5F',
          surfaceDim: '#0E1513',
          surfaceBright: '#343B38',
          surfaceContainerLowest: '#090F0E',
          surfaceContainerLow: '#171D1B',
          surfaceContainer: '#1B211F',
          surfaceContainerHigh: '#252B29',
          surfaceContainerHighest: '#303634',
        },
      },
      space: {
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        13: '52px',
        14: '56px',
        15: '60px',
        16: '64px',
        17: '68px',
        18: '72px',
        19: '76px',
        20: '80px',
        21: '84px',
        22: '88px',
        23: '92px',
        24: '96px',
        25: '100px',
        26: '104px',
        27: '108px',
        28: '112px',
        29: '116px',
        30: '120px',
      },
      boxShadow: {
        elevation1:
          '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        elevation2:
          '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        elevation3:
          '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.30)',
        elevation4:
          '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px 0px rgba(0, 0, 0, 0.30)',
        elevation5:
          '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.30)',
      },
      borderRadius: {
        none: '0',
        extraSmall: '4px',
        small: '8px',
        medium: '12px',
        large: '16px',
        extraLarge: '28px',
        full: '1000px',
      },
      fontSize: {
        displayLarge: [
          '57px',
          {
            fontWeight: '400',
            lineHeight: '64px',
            letterSpacing: '-0.25px',
          },
        ],
        displayMedium: [
          '45px',
          {
            fontWeight: '400',
            lineHeight: '52px',
            letterSpacing: '0',
          },
        ],
        displaySmall: [
          '36px',
          {
            fontWeight: '400',
            lineHeight: '44px',
            letterSpacing: '0',
          },
        ],
        headlineLarge: [
          '32px',
          {
            fontWeight: '400',
            lineHeight: '40px',
            letterSpacing: '0',
          },
        ],
        headlineMedium: [
          '28px',
          {
            fontWeight: '400',
            lineHeight: '36px',
            letterSpacing: '0',
          },
        ],
        headlineSmall: [
          '24px',
          {
            fontWeight: '400',
            lineHeight: '32px',
            letterSpacing: '0',
          },
        ],
        titleLarge: [
          '22px',
          {
            fontWeight: '400',
            lineHeight: '28px',
            letterSpacing: '0',
          },
        ],
        titleMedium: [
          '16px',
          {
            fontWeight: '500',
            lineHeight: '24px',
            letterSpacing: '0.15px',
          },
        ],
        titleSmall: [
          '14px',
          {
            fontWeight: '500',
            lineHeight: '20px',
            letterSpacing: '0.1px',
          },
        ],
        bodyLarge: [
          '16px',
          {
            fontWeight: '400',
            lineHeight: '24px',
            letterSpacing: '0.5px',
          },
        ],
        bodyMedium: [
          '14px',
          {
            fontWeight: '400',
            lineHeight: '20px',
            letterSpacing: '0.25px',
          },
        ],
        bodySmall: [
          '12px',
          {
            fontWeight: '400',
            lineHeight: '16px',
            letterSpacing: '0.4px',
          },
        ],
        labelLarge: [
          '14px',
          {
            fontWeight: '500',
            lineHeight: '20px',
            letterSpacing: '0.1px',
          },
        ],
        labelMedium: [
          '12px',
          {
            fontWeight: '500',
            lineHeight: '16px',
            letterSpacing: '0.5px',
          },
        ],
        labelSmall: [
          '11px',
          {
            fontWeight: '500',
            lineHeight: '16px',
            letterSpacing: '0.5px',
          },
        ],
      },
      transitionDuration: {
        short1: '50ms',
        short2: '100ms',
        short3: '150ms',
        short4: '200ms',
        medium1: '250ms',
        medium2: '300ms',
        medium3: '350ms',
        medium4: '400ms',
        long1: '450ms',
        long2: '500ms',
        long3: '550ms',
        long4: '600ms',
        extraLong1: '700ms',
        extraLong2: '800ms',
        extraLong3: '900ms',
        extraLong4: '1000ms',
      },
      transitionDelay: {
        short1: '50ms',
        short2: '100ms',
        short3: '150ms',
        short4: '200ms',
        medium1: '250ms',
        medium2: '300ms',
        medium3: '350ms',
        medium4: '400ms',
        long1: '450ms',
        long2: '500ms',
        long3: '550ms',
        long4: '600ms',
        extraLong1: '700ms',
        extraLong2: '800ms',
        extraLong3: '900ms',
        extraLong4: '1000ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        standardDecelerate: 'cubic-bezier(0, 0, 0, 1)',
        standardAccelerate: 'cubic-bezier(0.3, 0, 1, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1.0)',
        emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
        emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
        legacy: 'cubic-bezier(0.4, 0, 0.2, 1.0)',
        legacyDecelerate: 'cubic-bezier(0, 0, 0.2, 1)',
        legacyAccelerate: 'cubic-bezier(0.4, 0, 1, 1)',
        linear: 'cubic-bezier(0, 0, 1, 1)',
      },
    },
  },
  plugins: [form],
} satisfies Config;
