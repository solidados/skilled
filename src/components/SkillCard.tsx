import { type FC, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
	ArrowBigUp,
	ArrowUpRight,
	BookMarkedIcon,
	Check,
	Copy,
	MessageSquare,
} from "lucide-react";

interface SkillCardProps {
	authorEmail: string | null | undefined;
	category: string;
	createdAt: string | null | undefined;
	description: string;
	installCommand: string;
	tags: string[];
	title: string;
}

const SkillCard: FC<SkillCardProps> = (props) => {
	const {
		authorEmail,
		category,
		createdAt,
		description,
		installCommand,
		tags,
		title,
	} = props;

	const [copied, setCopied] = useState<boolean>(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(installCommand);
			setCopied(true);

			// Clear any existing timeout before setting a new one
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error("Failed to copy to clipboard:", error);
		}
	};

	useEffect(() => {
		// Cleanup timeout on unmount
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (
		<article className="skill-card">
			<Link
				to="/skills"
				tabIndex={-1}
				aria-label={`Open ${title}`}
				className="overlay"
			/>

			<div className="chrome">
				<div className="chrome-bar">
					<div className="lights">
						<div className="light red" />
						<div className="light amber" />
						<div className="light green" />
					</div>
					<div className="host">registry.sh</div>
				</div>
			</div>

			<div className="body">
				<div className="meta">
					<div className="author">
						<img src="/logo512.png" alt="author avatar" className="avatar" />
						<div className="author-copy">
							<p>{authorEmail ?? "Unknown author"}</p>
							{/*<p>{createdAt ? new Date(createdAt).toLocaleDateString("am-AM") : 'N/A'}</p>*/}
							<p>
								{(() => {
									if (!createdAt) return "N/A";
									const parsed = new Date(createdAt);
									return Number.isNaN(parsed.getTime())
										? "N/A"
										: parsed.toLocaleDateString("am-AM");
								})()}
							</p>
						</div>
					</div>

					<p className="category">{category}</p>
				</div>

				<div className="summary">
					<Link to="/skills" className="title-link">
						<h3>{title}</h3>
					</Link>

					<p>{description}</p>
				</div>

				<div className="command">
					<div className="command-copy">
						<span style={{ userSelect: "none" }}>{">_"}</span>
						<p>{installCommand}</p>
					</div>
					<button
						type="button"
						className="copy"
						onClick={handleCopy}
						aria-label="Copy install command"
					>
						{!copied ? <Copy size={16} /> : <Check color="green" size={16} />}
					</button>
				</div>

				<div className="footer">
					<div className="stats">
						<button type="button" className="upvote" disabled>
							<ArrowBigUp size={16} fill="currentColor" />
							<span>{tags.length}</span>
						</button>

						<div className="comments">
							<MessageSquare size={14} />
							<span>{authorEmail ? 1 : 0}</span>
						</div>
					</div>

					<div className="actions">
						<Link to="/skills" className="open" title={`Open ${title}`}>
							<span>Open</span>
							<ArrowUpRight size={14} />
						</Link>

						<button
							type="button"
							className="save"
							aria-label="Saved state"
							disabled
						>
							<BookMarkedIcon size={16} />
						</button>
					</div>
				</div>
			</div>
		</article>
	);
};

export default SkillCard;
