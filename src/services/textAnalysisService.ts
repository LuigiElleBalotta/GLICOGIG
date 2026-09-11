import type {
  AnalizzaResponse,
  AnalizzaTestoRequest,
  AnalyzeTextInput,
  TextAnalyzer,
  TextAnalysisServiceConfig,
} from '../types/analysis'
import {
  AnalysisError,
  analysisErrorPayload,
  isAnalysisAbortError,
  parseAnalizzaResponse,
  readAnalysisResponse,
} from './photoAnalysisService'
import { createEphemeralRequestDeviceId } from './requestDeviceId'

const MAX_TEXT_LENGTH = 2000

const STATUS_MESSAGES: Partial<Record<number, string>> = {
  400: 'Descrizione non valida. Indica alimenti e quantità in modo più preciso.',
  401: 'Password non corretta. Controllala e riprova.',
  402: 'Al momento non è possibile avviare un’altra analisi.',
  413: 'La descrizione è troppo lunga.',
  429: 'Hai avviato troppe analisi ravvicinate. Attendi un momento e riprova.',
}

function assertSameOriginPath(endpoint: string): void {
  if (!endpoint.startsWith('/') || endpoint.startsWith('//')) {
    throw new Error('L’endpoint di analisi testuale deve essere same-origin.')
  }
}

export function createTextAnalysisService(config: TextAnalysisServiceConfig): TextAnalyzer {
  assertSameOriginPath(config.endpoint)
  return {
    async analyze({ text, lang, accessKey, signal }: AnalyzeTextInput): Promise<AnalizzaResponse> {
      const normalizedText = text.trim()
      if (!normalizedText || normalizedText.length > MAX_TEXT_LENGTH) {
        throw new AnalysisError(
          normalizedText ? 'La descrizione è troppo lunga.' : 'Descrivi il piatto prima di analizzarlo.',
          400,
          'INVALID_TEXT',
        )
      }

      const payload: AnalizzaTestoRequest = {
        text: normalizedText,
        device_id: createEphemeralRequestDeviceId(),
        premium: config.premium,
        lang,
      }

      let response: Response
      try {
        response = await fetch(config.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(accessKey ? { 'X-App-Access-Key': accessKey } : {}),
          },
          body: JSON.stringify(payload),
          signal,
        })
      } catch (error) {
        if (isAnalysisAbortError(error)) throw error
        throw new AnalysisError('Connessione non riuscita. Controlla la rete e riprova.', 0, 'NETWORK_ERROR')
      }

      const data = await readAnalysisResponse(response)
      if (!response.ok) {
        const serverError = analysisErrorPayload(data)
        throw new AnalysisError(
          STATUS_MESSAGES[response.status] || 'Analisi non riuscita. Riprova tra poco.',
          response.status,
          serverError.code || 'ANALYSIS_ERROR',
        )
      }

      return parseAnalizzaResponse(data)
    },
  }
}

const configuredPremium = import.meta.env.VITE_ANALYSIS_PREMIUM?.toLowerCase() !== 'false'

export const textAnalysisService = createTextAnalysisService({
  endpoint: import.meta.env.VITE_ANALYSIS_TEXT_PATH || '/api/analyze-text',
  premium: configuredPremium,
})
