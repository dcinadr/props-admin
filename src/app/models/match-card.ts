
import { MatchCardOption } from './match-card-option';

/**
 * a match represented as a Card on the UI
 */
export class MatchCard {
    question: string;
    options: Array<MatchCardOption>;
    betCloseDate: string;
    category: string;
}
