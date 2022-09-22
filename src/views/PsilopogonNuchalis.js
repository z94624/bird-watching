import { useRef } from 'react';

import PsilopogonNuchalisHome from './PsilopogonNuchalis_Home';

import './PsilopogonNuchalis.css';

const PsilopogonNuchalis = () => {
	/* ScrollTrigger.scroller */
	const mainRef = useRef();

	return (
		<main className="h-100" ref={mainRef}>
			{/* 個人首頁 */}
			<PsilopogonNuchalisHome mainRef={mainRef} />
		</main>
	);
}

export default PsilopogonNuchalis;
